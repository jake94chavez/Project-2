var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Langhorne')

module.exports.Book = require('./book.js')