const mongoDataMethod = require('../../data/db');
const JobData = require ('../../models/jobList/JobData')

const jwt = require('jsonwebtoken');


const jobList_resolvers = {
    
    Query : {
        getJobbyId : async (parent , {id} , {mongoDataMethods}) => await mongoDataMethod.getJobbyID(id)
        
       
    },


    Mutation : {
        creatJobData : async (parent , args , contex , infor) => {
            console.log (args) ;
            const newJobData = new JobData({
                name : args.input.name ,
                jobType_1 : args.input.jobType_1,
                jobType_2 : args.input.jobType_2 ,
                jobType_3 : args.input.jobType_3,
                jobType_4 : args.input.jobType_4,
                jobType_5 :args.input.jobType_5,
                jobType_6 : args.input.jobType_6,
            })
            return await newJobData.save()
        },

        chooseJob: async (parent, args, context, info) => {
            const jobChoose = await JobData.findOne({
                name: args.input.name,
            });
        
            if (!jobChoose || !jobChoose.id) {
                throw new Error('Invalid Job');
            }
        
            // Tạo token
            const token = jwt.sign({ jobId: jobChoose._id, name: jobChoose.name }, 'your_secret_key', { expiresIn: '1h' });
            return { token };
        },
      
          
        
        


}
}

module.exports = jobList_resolvers