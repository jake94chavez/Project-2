var express = require('express');
var router = express.Router();
var User = require('../models/user');
var ENV = require('../app-env');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Langhorne')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Langhorne',
  	user: req.user
  });
});

module.exports = router;
