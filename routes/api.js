var express = require('express');
var router = express.Router();
var ENV = require('../app-env');
var mongoose = require('mongoose');
var db = require('../models');

router.get('/books', function api_index (req, res){
  db.Book.find(function (err, books) {
    if (err) {
      console.log('index error:' + err);
      res.sendStatus(500);
    }
    res.json(books);
  });
});

router.post('/books', (req, res) => {
  console.log('body', req.body);

  let book = new db.Book(req.body);
  book.save((err, createdBookObject) => {  //.save, saves the info
    if (err) {
        res.status(500).send(err);
    }                                        //numeric codes that tie in with the success and error in ajax
    res.status(200).send(createdBookObject);
  });
})


//get one book
router.get('/books/:id', function (req, res) {
  //get book id from params
  let bookId = req.params.id;

  db.Book.find(function (err, books) {
    if (err) {
      console.log('index error:' + error);
      res.sendStatus(500);
    }
    for (var i = 0; i < books.length; i++) {
      if (books[i]._id == bookId) {
        res.json(books[i]);
        break;
      }
    }
  });
});

module.exports = router;