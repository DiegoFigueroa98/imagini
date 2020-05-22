const { Image } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
  const images = await Image
    .find()
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  res.render('index', viewModel);
};

module.exports = ctrl;
