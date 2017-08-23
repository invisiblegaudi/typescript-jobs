/**
 * Created by Rico on 9/1/16.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// ROUTES
var appRoutes = require('./routes/appRoutes');
var employerRoutes = require('./routes/employerRoutes');
var jobPosts = require('./routes/jobpostsRoutes');
var jobseeker = require('./routes/jobseeker');
var uploads = require('./routes/uploadRoutes');
var userRoutes = require('./routes/userRoutes');
var registerRoute = require('./routes/registerRoutes');
var loginRoute = require('./routes/loginRoutes');

//AUTHCHECK
let authCheck = require('./routes/authCheck');


var app = express();
mongoose.connect('localhost:27017/JobBoard');
// mongoose.connect("mongodb://mrico3d:password@ds127428.mlab.com:27428/jobboard");
app.set('view engine', 'hbs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname+'\\views\\'));


// uncomment after placing your favicon in /public
console.log(path.join(__dirname, 'public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cookieParser());
//this was the default start up
app.use(express.static(path.join(__dirname, 'public')));

//after me changing to try and find a working upload folder
// app.use(express.static(path.join(__dirname, 'jobBoard/dist')));

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	
	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	}
	else {
		next();
	}
};

app.use(allowCrossDomain);

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers", "Origin","Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization");
	next();
});

// app.use(express.static(path.resolve(__dirname,  'public')));

// Always return the main index.html, so react-router render the route in the client
/*app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'views', 'index.hbs'));
});*/

app.use('/uploads', uploads);
app.use('/jobseeker', jobseeker);
app.use('/jobposts', jobPosts);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/user', authCheck, userRoutes);
app.use('/employer', authCheck, employerRoutes);
app.use('/', appRoutes);
app.use('/*', appRoutes);

//todo need to remove this before shipping

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
        res.render('index');
		// res.status(err.status || 500);
		/*res.json({
            rico: "nope shouldn't be here either",
			message: err.message,
			error: err
		});*/
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('index');
	/*res.status(err.status || 500);
	res.render('error', {
		rico: "nope shouldn't be here",
		message: err.message,
		error: {}
	});*/
});


module.exports = app;
