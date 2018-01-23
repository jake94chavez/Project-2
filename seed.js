var db = require('./models');

var bookList = [
	{
		title: 'The Time Machine',
		author: 'H.G. Wells',
		releaseDate: '1895',
		genres: ['Science Fiction'],
		haveRead: false,
		comment: ''

	},
	{
		title: 'God\'s Debris',
		author: 'Scott Adams',
		releaseDate:'2001',
		genres:['Fiction'],
		haveRead: false,
		comment: ''
	}
];
db.Book.remove({}, function(err, books){
	if(err) {
		console.log('Error occured in remove', err);
	} else {
		console.log('removed all books');

		db.Book.create(bookList, function(err, books){
			if(err) { return console.log('ERROR', err); }
			console.log('all books:', books);
			console.log('created', books.length, 'books');
			process.exit();
		});
	}
});