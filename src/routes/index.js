const express = require('express');
const router = express.Router();

// Controllers
const home = require('../controllers/home');
const image = require('../controllers/image');
const user = require('../controllers/users.controller');

// Helpers
const {
  isAuthenticated
} = require("../helpers/auth");

module.exports = app => {

  // Index Route
  router.get('/', home.index);

  // Images Routes
  router.get('/images/:image_id', image.index);
  router.post('/images', isAuthenticated, image.create);
  router.post('/images/:image_id/like', image.like);
  router.post('/images/:image_id/comment', isAuthenticated, image.comment);
  router.delete('/images/:image_id', isAuthenticated, image.remove);

  // Users Routes
  router.get("/users/signup", user.renderSignUpForm);

  router.post("/users/signup", user.singup);

  router.get("/users/signin", user.renderSigninForm);

  router.post("/users/signin", user.signin);

  router.get('/users/upload', isAuthenticated, home.upload);

  router.get("/users/logout", user.logout);

  app.use(router);

};