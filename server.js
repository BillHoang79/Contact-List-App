var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');
var port = Number(process.env.PORT || 8000);



app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/contactlist', function(req, res) {
    db.contactlist.find(function(err, docs) {
        res.json(docs);
    });
});  
     
app.post('/contactlist', function(req, res) {
    req.body._id = 0;
    db.contactlist.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    db.contactlist.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        res.json(doc);
    });
});

app.get('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.fineOne({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        res.json(doc);
    });
});

app.put('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name, email: req.body.email, number: req.body.number } },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });
});

app.listen(port)
    console.log("App is running on port 8000")