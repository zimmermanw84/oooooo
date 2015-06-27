var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var sessionStore = require("connect-mongo")(session);
var https = require('https');
var fs = require('fs');

var models = require("./models");

// Routes
var index = require('./routes/index');
var users = require('./routes/users');
var restaurants = require('./routes/restaurants');

var passport = require('passport');
var passportConfig = require('./config/passport');

var db = require('./models/index');

var port = process.env.PORT || '3000';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Google Oauth Config
app.set(passportConfig(passport));

// Session Config
app.use(cookieParser());

// MONGO Session Store
app.use(session({
    cookie: { maxAge: 1000*60*2 } ,
    secret: "session secret" ,
    resave: true,
    saveUninitialized: true,
    store: new sessionStore({
      host: 'localhost',
      port: 27017,
      db: 'oooSession',
      stringify: false,
      autoRemoveExpiredSession: true
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index, users, restaurants);

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

// Self Signed certs
var privateKey = fs.readFileSync( 'key.pem' );
var certificate = fs.readFileSync( 'cert.pem' );


// Start HTTPS SERVER
models.sequelize.sync().then(function () {
  https.createServer({
      key: privateKey,
      cert: certificate,
      passphrase: 'chewy',
  }, app).listen(port);
});


