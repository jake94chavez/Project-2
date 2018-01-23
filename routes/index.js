var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Langhorne',
  	user: req.user
  });
	console.log(req.user)
});

module.exports = router;
