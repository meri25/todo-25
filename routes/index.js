var express = require('express');
var router = express.Router();

const MONGO_URI = process.env.MONGODB_URI;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: MONGO_URI });
  //res.render('main');
});

module.exports = router;
