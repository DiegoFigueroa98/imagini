const path = require('path');
const morgan = require('morgan');
const express = require('express');
const errorHandler = require('errorhandler');
const multer = require('multer');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const session = require('express-session');

const routes = require('../routes');

module.exports = app => {

  // Settings
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '../views'));
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./helpers'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  }));
  app.set('view engine', '.hbs');
  app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));

  // middlewares
  app.use(morgan('dev'));
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());

  app.use(session({
    secret: 'somesecretkey',
    resave: true,
    saveUninitialized: true
  }));

  // Routes
  routes(app);

  // Static files
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // Error Handling
  if('development' === app.get('env')) {
    app.use(errorHandler());
  }

  return app;

};
