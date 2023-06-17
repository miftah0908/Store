__path = process.cwd()

const express = require('express');
const expressSession = require('express-session');
const expressEjsLayout = require('express-ejs-layouts');
const memoryStore = require('memorystore')(expressSession);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
cors = require('cors');
secure = require('ssl-express-www');

const { connectToMongoDb } = require('./mongoDb/connect');

const mainRouter = require('./route/index')
authRouter = require('./route/auth')
pagesRouter = require('./route/pages')

var app = express()
app.set('view engine', 'ejs');
app.set("views", __path + "/public/views");
app.use(express.static(__path + "/public"));
app.use(expressEjsLayout);
app.use(cors())
app.use(secure)
app.use(expressSession({
  secret: 'secret',  
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new memoryStore({
    checkPeriod: 86400000
  }),
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
require('./controller/passport')(passport);
app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

app.use('/', mainRouter)
app.use('/auth/', authRouter)
app.use('/pages/', pagesRouter)

app.use(function (req, res, next) {
    res.render('error', {
    layout: 'error'
  });
})

connectToMongoDb();

module.exports = app
