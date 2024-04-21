

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobData = new Schema ({
    name : {
        type : String
    },
    jobType_1 : {
        type : String
    },
    jobType_2 : {
        type : String
    },
    jobType_3 : {
        type : String
    },
    jobType_4 : {
        type : String
    }, jobType_5 : {
        type : String
    },
    jobType_6 : {
        type : String
    },
})

module.exports = mongoose.model('JobData', JobData);