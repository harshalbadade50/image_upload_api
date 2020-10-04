var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient;
var ObjectId = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
let db = "";

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.error(err);
        return
    }
    db = client.db('imgedb');
    let collection = db.collection('imagedetails');
})

// upload image API
router.post('/uploadImage', function (req, res, next) {
    let collection = db.collection('imagedetails');
    collection.insertOne({
        vertical: req.body.vertical,
        horizontal: req.body.horizontal,
        horizontalsmall: req.body.horizontalsmall,
        gallery: req.body.gallery
    }, (err, result) => {
        if (err) {
            console.log('error in uploading images - ', err);
            res.send("error in uploading images");
        }
        res.send(JSON.stringify(result));
    })
});

// fetch images API
router.get('/fetchImages', function (req, res, next) {
    let collection = db.collection('imagedetails');
    collection.find({}).toArray((err, result) => {
        console.log('fetch result - ', result);
        if (err) {
            console.log("Error in fetching employees - ", err);
            res.send("Error in fetching all Employees");
        }
        res.send(JSON.stringify(result));
    });
});

module.exports = router;
