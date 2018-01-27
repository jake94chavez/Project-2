var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema ({
	title: {
		type: String,
		required: [true, 'This book needs a title']
	},
	author: {
		type: String,
		required: [true, 'This book needs an author']
	},
	releaseDate: String,
	genres: [{
		type: String,
	}],
	haveRead: {
		type: Boolean,
		default: false
	},
	img: String,
	comment: String
});

var Book = mongoose.model('Book', BookSchema);
module.exports = Book;