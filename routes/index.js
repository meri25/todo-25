var express = require('express');
var router = express.Router();


const MONGO_URI = process.env.MONGODB_URI;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const assert = require('assert');

MongoClient.connect(MONGO_URI, (err, db) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db.close();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  //res.render('main');
});

module.exports = router;
