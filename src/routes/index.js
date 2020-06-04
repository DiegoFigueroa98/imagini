const express = require('express');
const router = express.Router();

// Controllers
const home = require('../controllers/home');
const image = require('../controllers/image');
const user = require('../controllers/users.controller');

module.exports = app => {

  router.get('/', home.index);
  router.get('/images/:image_id', image.index);
  router.post('/images', image.create);
  router.post('/images/:image_id/like', image.like);
  router.post('/images/:image_id/comment', image.comment);
  router.delete('/images/:image_id', image.remove);
  
  // User routes
  const {
    renderSignUpForm,
    singup,
    renderSigninForm,
    signin,
    logout
  } = require("../controllers/users.controller");
  
  // Routes
  router.get("/users/signup", renderSignUpForm);
  
  router.post("/users/signup", singup);
  
  router.get("/users/signin", renderSigninForm);
  
  router.post("/users/signin", signin);
  
  router.get("/users/logout", logout);

  app.use(router);

};
