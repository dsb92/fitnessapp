module.exports.index = function(req, res){
    var db = req.db;
    var collection = db.get('workoutprogramscollection');
    collection.find({},{},function(e,docs){
        //res.send(docs)
        res.render('index', {
            "wop" : docs
        });
    });
}

module.exports.getnewprogram = function(req, res){
    res.render('newprogram', { title: 'Tilføj nyt trænningsprogram' });
}

module.exports.postnewprogram = function(req,res){
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var programName = req.body.name;

    // Set our collection
    var collection = db.get('workoutprogramscollection');

    // Submit to the DB
    collection.insert({
        "workoutprogram" : programName,
        "exercises" : []
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/");
        }
    });
}