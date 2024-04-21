const mongoDataMethod = require('../../data/db');
const JobData = require ('../../models/jobRegistion/JobData');
const typeDefs_account = require('../../schema/Accountschema');
const { JobType } = require('../jobList/jobList');
const jwt = require('jsonwebtoken');

const user_resolvers =  {

    Query : {
        Jobs : async (parent, args, { mongoDataMethods }) =>   await mongoDataMethod.getAllJob(),

        getJobbyName : async (parent , {JobName , status} , {mongoDataMethods})=> await mongoDataMethod.getJobbyName(JobName, status),

        getJobBookedbyName : async (parent , {customerId , status } , {mongoDataMethods}) => await mongoDataMethod.getJobBookedbyName(customerId , status),
        
        getYourJob : async (parent , {userId} , {mongoDataMethods}) => await mongoDataMethod.getYourJob(userId) ,

        getJobNameType : async (parent , {JobType} , {mongoDataMethods} ) => await mongoDataMethod.getJobNameType(JobType),

        getLastestJob : async (parent , {status}) => await mongoDataMethod.getAvailableJob(status)
           
        
    },

    Mutation : {
        jobRegistion : async (parents , args ,context , infor ) =>{
           const  newJob= new JobData ({
                JobName : args.input.JobName ,
                JobType : args.input.JobType ,
                price : args.input.price ,
                jobDecription : args.input.jobDecription,
                userId : args.input.userId,
                status : args.input.status,
                customerId : args.input.status 
            });
            return await newJob.save();
        },
        JobUserGet : async (parents , args , context ,infor) => {
            const jobChoose = JobData.findOne({
                JobName : args.input.JobName ,
    
            });
            const token = jwt.sign({ JobName: jobChoose.JobName, JobType: jobChoose.JobType }, 'your_secret_key', { expiresIn: '1h' });
            return { token };

        },
        jobBookingGet : async (parent , args , context , infor) => {
            const jobBooking =  await JobData.findById  ( {
               
                _id : args.input._id
            })
          
            const token  = jwt.sign ({userId: jobBooking.userId , status : jobBooking.status, _id : jobBooking._id } ,'your_secret_key', { expiresIn: '1h' } )
            return {token}
        }, 
        jobStatusChange : async (parent , args , context , infor ) => {

      
            const updateStatus = await JobData.findOneAndUpdate (
                { _id: args.input._id },
                { $set:{ status: args.input.status , 
                        customerId : args.input.customerId } },
                { returnOriginal: false }
            )
            return updateStatus.value
        },
        jobCancel : async (parent , args , context , infor ) => {
            const reUpdateStatus = await JobData.findOneAndUpdate (
                { _id: args.input._id },
                { $set:{ status: args.input.status , 
                        customerId : args.input.customerId } },
                { returnOriginal: false }
            )
            return  reUpdateStatus.value
        },
        jobDelete : async (parent , args , context , infor) => {
            const deletejob = await JobData.findOneAndDelete({_id : args.input._id})
            return deletejob.value
        }

    },
    
}
module.exports= user_resolvers;