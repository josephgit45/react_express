var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var venmoRouter = require('./routes/venmo');

var app = express();

// var expressWs = require('express-ws')(app);
 
// var parsedData = {};
// parsedData.username = "user";
// parsedData.dateCreated = "date";
// parsedData.note = "note";
// parsedData.amount = "a,pimt";


// app.use(function (req, res, next) {
//   console.log('middleware');
//   req.testing = 'testing';
//   return next();
// });

// app.ws('/', function(ws, req) {
//   ws.on('message', function(msg) {
//     console.log(msg);
//   });
//   console.log('socket', req.testing);
//   console.log(expressWs.getWss().clients.size);
//   ws.send(JSON.stringify(parsedData));
// });

 
// app.listen(5050);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/venmo', venmoRouter);

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
