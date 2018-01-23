// This page handles all requests to the database, GET POST PUT and DELETE
var express = require('express');
var router = express.Router();
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

// post new book into database
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

// delete a book from database
router.delete('/books/:id', function deleteBook(req, res) {
  console.log('deleting id: ', req.params.id);
  db.Book.remove({_id: req.params.id}, function(err) {
    if (err) { return console.log(err); }
    console.log("removal of id=" + req.params.id  + " successful.");
    res.status(200).send(); // everything is a-OK
  });
});

// update a book in the database
router.put('/books/:id', function updateBook(req, res) {
  console.log('updating id ', req.params.id);
  console.log('received body ', req.body);

  db.Book.findOne({_id: req.params.id}, function(err, foundBook) {
    if (err) { console.log('error', err); }
    foundBook.author = req.body.authorName;
    foundBook.title = req.body.name;
    foundBook.releaseDate = req.body.releaseDate;
    if (req.body.haveRead) {
      foundBook.haveRead = req.body.haveRead
    }
    foundBook.save(function(err, saved) {
      if(err) { console.log('error', err); }
      res.json(saved);
    });
  });
});

module.exports = router;