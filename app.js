var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var expressSession = require('express-session');
var passport = require('passport');


mongoose.connect('mongodb://localhost:27017/Langhorne')

var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var api = require('./routes/api');
var read = require('./routes/read')

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// MiddleWare
app.use(cookieParser());
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/users', users);
app.use('/login', index);
app.use('/api', api);
app.use('/read', read);

// OAuth setup
// var ENV = require('./app-env');
var googleClientKey = process.env.GOOGLE_CLIENT_ID;
var googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

//Sessions
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

// Google Strategy
var User = require('./models/user');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let googleCallbackUrl;
if ( app.get('env') === 'development' ) {
	googleCallbackUrl = "http://127.0.0.1:3000/auth/google/callback"
} else {
	googleCallbackUrl = "http://quiet-beach-46840.herokuapp.com/auth/google/callback"
}
passport.use(new GoogleStrategy({
	clientID: googleClientKey,
	clientSecret: googleClientSecret,
	callbackURL: googleCallbackUrl
},
function(accessToken, refreshToken, profile, done) {
	User.findOne({
		'google.id': profile.id
	}, function(err, user) {
		if (err, user) {
			return done(err);
		}
		if (!user) {
			user = new User({
				google: profile
			});
			user.save(function(err) {
				if (err) console.log(err);
				return done(err, user);
			});
		} else {
			return done(err, user);
		}
	});
}
));

// -> Google
app.get('/auth/google', passport.authenticate('google', { scope: "email" }));

// <- Google
app.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' }));

  // Logout
app.get('/logout', function(req, res) {
    req.session.destroy(function(e){
        req.logout();
        res.redirect('/');
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// API

module.exports = app;
