const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  showIn : {
    type : String
  },
});

const workSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Icon',
    required: true,
  },
});

const sliderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Icon',
    required: true,
  },
});

const Icon = mongoose.model('Icon', iconSchema);
const Work = mongoose.model('Work', workSchema);
const Slider = mongoose.model('Slider', sliderSchema);

module.exports = { Icon, Work, Slider };