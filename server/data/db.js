

const Job = require('../models/jobRegistion/JobData')
const Account = require('../models/account/AccountRegister')

const { Icon, Work } = require ('../models/image')



const mongoDataMethod  = {
    getUserName : async id => await  Account.findById(id),

    getAllUser : async (condition = null)=> condition === null ? await Account.find() : await Account.find(condition),

    getJobbyName : async JobName => await Job.find({ JobName : JobName ,status : "available"}),

    getJobBookedbyName : async customerId => await Job.find({ customerId : customerId ,status : "unavailable"}),

    getYourJob : async userId => await Job.find({ userId : userId }),

    getAvailableJob : async status => await Job.find ({status : status}),

    getJobNameType : async JobType => await Job.find ({JobType : JobName}),

    getAllJob : async (condition = null)=> condition === null ? await Job.find() : await Job.find(condition),

    getJobbyID : async id => await JobData.findById(id),

    getJobbyJobType : async JobType => await JobType.find({JobType : JobType}),

    getIconByname : async name => await Icon.findOne({name : name}),

    getIconInMainScreen : async showIn => await Icon.find ({showIn : showIn})



    
   
}


module.exports = mongoDataMethod