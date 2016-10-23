require('babel-polyfill');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var cms = require('./routes/cms');

var api = require('./routes/api');

var app = express();

var browserify = require('browserify-middleware');
var layout = require('express-layout');
var session = require('express-session');
var passport = require('passport');

var db = require('./db/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layout());
app.use((req,res,next)=>{ res.locals.title='Tantsklass.fm'; next();});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({ secret: 'the waiter is masturbator' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db('users').where({id}).first()
    .then(user=>{
          done(null, user);
    }, err=>done(err));
});

browserify.settings({
  transform: ['vueify']
});

app.use('/js', browserify(__dirname + '/public/javascripts', {
    transform: ['vueify']
}));

app.use('/', routes);
app.use('/api', api);
app.use('/users', users);
app.use('/cms', cms);

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  async function(email, password, done) {
    try{
      const user = await db('users').where({email}).first('*');
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!require('bcrypt').compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch(err){
      done(err);
    }
  }
));

app.get('/login', (req,res)=>{
  res.render('login', {error: null, email: '', password: ''});
});

app.get('/logout', (req,res)=>{
  req.logout();
  res.redirect('/');
});

app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
*/

module.exports = app;
