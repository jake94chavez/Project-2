var mongoose = require('mongoose');
let mLabUsername = process.env.MLABUSER;
let mLabPassword = process.env.MLABPASSWORD;
let url = 'mongodb://${mLabUsername}:${mLabPassword}@ds045011.mlab.com:45011/heroku_6wm4bl2r'
// let url = 'mongodb://localhost:27107/Langhorne'
mongoose.connect(url, 
				{useMongoClient: true},
				(err) => {
					if (err) throw err;
					else {console.log('connection to db successful');}
				});

module.exports.Book = require('./book.js')