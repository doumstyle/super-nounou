require('./config/dbConfig');
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require("connect-flash");
const hbs = require("hbs");
const session = require("express-session");

const indexRouter = require('./routes/index.route');
const authRouter = require('./routes/auth.route');
const familiesRouter = require('./routes/families.route');
const babysittersRouter = require('./route/babysitters.route');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		secret:
			process.env.SESSION_SECRET || "ASecretStringThatSouldBeHARDTOGUESS/CRACK",
		saveUninitialized: true,
		resave: true,
	})
);

//app.use(flash());

app.use(function myCookieLogger(req, res, next) {
	console.log(req.cookies);
	next();
});

// const devMode = true;

// if (devMode === true)
//   app.use(function createFakeLoggedInUser(req, res, next) {
//     res.locals.currentUser = {
//       _id: "ksdnsx73dksk",
//       name: "foo",
//       email: "bar@bar.bar",
//     };
//     next();
//   });

//app.use(require("./middlewares/exposeFlashMessage"));
//app.use(require("./middlewares/exposeLoginStatus"));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/families', familiesRouter); 
app.use('/babysitters', babysittersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;