var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
// var uristring = 'mongodb://localhost/';

// var db = mongoose.connect(uristring);

// var mongoose = require('mongoose');
var MONGO_URI = process.env.MONGODB_URI || 'mongo://localhost/';
process.on('unhandledRejection', console.dir);
var mongoose = require('mongoose');
var MONGO_URI = process.env.MONGODB_URI;
mongoose.connect(MONGO_URI, function(err){
  if(err){
    res.render('index', {dbStatus: err});
  }else{
    res.render('index', {dbStatus:'success'});
  }
});
// process.on('unhandledRejection', console.dir);
// mongoose.connect(MONGO_URI);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error!'));
// db.once('open', function(){
//   console.log('we are connected!');
// });

// const MONGO_URI = process.env.MONGODB_URI;
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const assert = require('assert');

// MongoClient.connect(MONGO_URI, (err, db) => {
//     assert.equal(null, err);
//     console.log("Connected successfully to server.");
//     db.close();
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {MONGO_URI: MONGO_URI});
  //res.render('main');
  
});

module.exports = router;
