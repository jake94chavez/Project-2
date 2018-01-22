var express = require('express');
var router = express.Router();
var ENV = require('../app-env');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { 
  	title: 'Langhorne',
  });
});

module.exports = router;
