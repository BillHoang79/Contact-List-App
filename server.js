var express = require('express')
var app = express()
var mongojs = require('mongojs')
var db = mongojs('contactlist', ['contactlist'])
var bodyParser = require('body-parser')
var port = process.env.PORT || 8000



app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json())


app.get('/contactlist', function(req, res) {
    console.log("I received a GET request")

    db.contactlist.find(function(err, docs) {
        console.log(docs)
        res.json(docs)
    })
})   
  
app.post('/contactlist', function(req, res) {
    req.body._id = 0
    db.contactlist.insert(req.body, function(err, doc) {
        res.json(doc)
    })
})﻿

app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id
    console.log(id)
    db.contactlist.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        res.json(doc)
    })
})

app.get('/contactlist/:id', function(req, res) {
    var id = req.params.id
    console.log(id)
    db.contactlist.fineOne({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        res.json(doc)
    })
})

app.put('/contactlist/:id', function(req, res) {
    var id = req.params.id
    console.log(req.body.name)
    db.contactlist.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name, email: req.body.email, number: req.body.number } },
        new: true
    }, function(err, doc) {
        res.json(doc)
    })
})

server.listen(port, function() {
    console.log("App is running on port " + port)
})