var express = require('express');
var router = express.Router();

router.use('/static', express.static(__dirname + '/public'));


var mongoose = require('mongoose');
var uristring = 'mongodb://localhost/';


// var db = mongoose.connect(uristring);
console.log('8');
// var mongoose = require('mongoose');
var MONGO_URI = process.env.MONGODB_URI || 'mongo://localhost/test';
// process.on('unhandledRejection', console.dir);
// // var mongoose = require('mongoose');
// // var MONGO_URI = process.env.MONGODB_URI;
// mongoose.connect(MONGO_URI, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log('success');
//   }
// });


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

console.log("test");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');

});

router.get('/index', function(req, res, nexr){
  console.log(req.query);
  switch(req.query.status){
    case "add":
      if(req.query.text !== ""){
        res.send(saveData(req.query.text));
      }else{
        console.log("null!!!!");
        res.send("null!!!!");
      }
      break;

    case "change":
      console.log('case:change');
      console.log(req.query.id);
      res.send(saveStatus(req.query.id));
      break;
    case "update":
      res.send(lastData());
      break;
  }
  
});

function lastData(){
  var fs = require('fs');
  var jsonFile = fs.readFileSync('todo.json', 'utf8'); //get file
  return jsonFile;
}

/* json */
function saveData(req){
  var fs = require('fs');
  var jsonFile = fs.readFileSync('todo.json', 'utf8'); //get file
  var datas = JSON.parse(jsonFile || "null");                 //parose JSON
  if(datas == null){
    var id = 0;
    datas = [{'id': id, 'text': 'what you do', 'status': 'status'}];
    var data = {'id': id+1, 'text': req, 'status': 'do',}; 
    datas.push(data); 
  }else{
    var id = datas.length;
    var data = {'id': id, 'text': req, 'status': 'do',}; 
    datas.push(data);                     //add requested array to file array
  }
  fs.writeFile('todo.json', JSON.stringify(datas), (err) => {
    if(err){
      console.log('failed to write');
      throw err;
    }else{
      console.log('success!');
    }
  });
  return JSON.stringify(datas);
}

function saveStatus(req){
  var fs = require('fs');
  var jsonFile = fs.readFileSync('todo.json', 'utf8'); //get file
  var datas = JSON.parse(jsonFile || "null");   
  datas[req]['status'] = 'done';
  fs.writeFile('todo.json', JSON.stringify(datas), (err) => {
    if(err){
      console.log('failed to write');
      throw err;
    }else{
      console.log('success done!');
    }
  });
  return JSON.stringify(datas);
}

module.exports = router;
