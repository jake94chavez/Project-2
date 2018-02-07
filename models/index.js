var mongoose = require('mongoose');
let mLabUsername = process.env.MLABUSER;
let mLabPassword = process.env.MLABPASSWORD;
// let url = 'mongodb://${mLabUsername}:${mLabPassword}@ds111568.mlab.com:11568/langhorne'
// mongoose.connect = ('mongodb://localhost:27017/Langhorne')
// mongoose.connect(url, 
// 				{useMongoClient: true},
// 				(err) => {
// 					if (err) throw err;
// 					else {console.log('connection to db successful');}
// 				});

module.exports.Book = require('./book.js')