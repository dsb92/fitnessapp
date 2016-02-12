module.exports.workout = function(req, res){
    var db = req.db;

    var collection = db.get('workoutprogramscollection');
    collection.find({"_id": req.params.id},{},function(e,docs){
        //res.send(docs);
        res.render('workout', {
            "program" : docs
        });
    });
}

module.exports.getnewworkout = function (req, res){
    res.render('newworkout', { 
        title: 'Tilføj ny øvelse',
        workoutid: req.params.id 
        });
}

module.exports.postnewworkout = function (req, res){
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var exerciseId = req.params.id;
    var exerciseName = req.body.name;
    var exerciseDesc = req.body.desc;
    var exerciseSet = req.body.set;
    var exerciseSettime = req.body.settime;
    
    var collection = db.get('workoutprogramscollection');
    collection.find({"_id": exerciseId},{},function(e,docs){
        var exerciseJson = docs[0];
        exerciseJson['exercises'].push({"name": exerciseName, "description": exerciseDesc, "set": exerciseSet, "repeat":exerciseSettime});
        //res.send(exerciseJson);
        
        collection.update({"_id": exerciseId}, {$set: {"workoutprogram": exerciseJson['workoutprogram'], "exercises": exerciseJson['exercises']}}, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.redirect("/workout/"+exerciseId);
            }
        });
      
    });
}

module.exports.completeprogram = function (req, res){
    // Set our internal DB variable
    var db = req.db;

    var exerciseId = req.params.id;
    
    var collection = db.get('workoutprogramscollection');
    collection.find({"_id": exerciseId},{},function(e,docs){
        var exerciseJson = docs[0];
        var programName = exerciseJson['workoutprogram'];
        
        // Genereate HTML-file
        // Kilde: http://stackoverflow.com/questions/21617468/node-js-generate-html
        var fs = require('fs');
        
        var fileName = process.cwd()+'/diplom_'+programName+".html";
        var stream = fs.createWriteStream(fileName);
        
        stream.once('open', function(fd) {
        var html = buildHtml(programName);
        
        stream.end(html);
 
        var logcollection = db.get('workoutlogcollection');    
 
        // If the document does not exist, create it and increment completed value by 1       
        logcollection.update(
            {"completedprogram": programName},
            {
                $inc: { completed: 1},
                $set: {
                    "completedprogram": programName,
                    "lastcompleted": new Date().toLocaleString()
                }
            },
            { upsert: true}
        )
        
        // Send the htmt-site to the user
        res.send(html);
        
        });
    });
}

function buildHtml(req) {
  var header = 'Tillykke!';
  var body = 'Du har gennemført træningsprogrammet ' + req;

  return '<!DOCTYPE html>'
       + '<html><header>' + header + '</header><body>' + body + '</body></html>';
};