module.exports.workoutlog = function(req, res){
    var db = req.db;
    var collection = db.get('workoutlogcollection');
    collection.find({},{},function(e,docs){
        //res.send(docs)
        res.render('workoutlog', {
            title: 'Historik',
            "wolog" : docs
        });
    });
}