const createError = require('http-errors');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
require('./db/dbconfig')(process.env);
const environment = process.env.NODE_ENV;
var routes = require('./routes/index');
const stage = require('./config')[environment];
var app = express();
const scheduler = require('./scheduler/index');
new scheduler().initialize(() => {});
const router = express.Router();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if (environment != 'production') {
  app.use(logger('dev'));
}

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', routes(router));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === environment ? err : {};
  if (environment == 'production') {
    res.locals.error.status = err.status;
  }
  if (req["headers"]["content-type"] == "application/json") {
    res.status(err.status || 500).json({ status: err.status, message: `Awww...Don't Cry. It's just a ${err.status}. for any help please contact@hapy.store.` });
  } else {
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;