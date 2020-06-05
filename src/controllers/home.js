const sidebar = require('../helpers/sidebar');
const { Image } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
  const images = await Image
    .find()
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  res.render('index', {
    viewModel: viewModel.images, layout: 'index'
  });
};

ctrl.profile = async (req, res) => {
  const images = await Image
    .find({user: req.user.id})
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  res.render('profile', {
    viewModel: viewModel.images, layout: 'profile'
  });
};

ctrl.upload = async (req, res) => {
  const images = await Image
    .find()
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render('upload', viewModel);
};

module.exports = ctrl;
