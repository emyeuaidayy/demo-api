// jobModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobName = new Schema({
  jobName :{
    type : String
  },

 

});



module.exports = mongoose.model('JobName', jobName);
