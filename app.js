var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var Handlebars = require('hbs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

Handlebars.registerHelper({
  prettydate: function(date) {
    return moment(date).format("h:mm:ss")
  },
  addbutton: function(username, usercookie, id, options) {
    if (username === usercookie) {
      return "<button class='delete-btn' data-post-id='" + id + "'>DELETE</button>";
    }
  },
  addjs: function(username, usercookie) {
    if (username === usercookie) {
      var output = "<script>$('.delete-btn').click(function(e) {$.ajax({url: 'delete/' + $(this).attr('data-post-id'), method: 'DELETE'}).done(function() {location.reload()})})</script>"
      return output;
    } else {
      return;
    }
  }
});


module.exports = app;
