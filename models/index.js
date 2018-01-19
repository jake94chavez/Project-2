var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27107/Langhorne')

module.exports.Book = require('./book.js')