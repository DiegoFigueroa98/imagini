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
