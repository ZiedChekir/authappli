//PAckagess ================== PAckages ================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var app = express();
var session = require('express-session');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var flash = require('connect-flash');
var mongoStore = require('connect-mongo')(session);
var validator = require('express-validator');
mongoose.Promise = global.Promise;
//===================MODULES ============================
var index = require('./routes/index');
var user =  require('./routes/user');
//connect to the fucking database

  mongoose.createConnection('localhost:27017/authapp');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout:'layout',extname:'.hbs'}));
app.set('view engine', '.hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret:'mysuperscret',
  resave:false,
  saveUninitialized:false,
  store:new mongoStore({mongooseConnection:mongoose.connection}),
  cookie:{maxAge:300000}
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){

  res.locals.session = req.session;
  res.locals.user = req.user;
    res.locals.cart = req.session.cart;
  next();
});

app.use('/', index);
app.use('/user',user );



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

module.exports = app;
