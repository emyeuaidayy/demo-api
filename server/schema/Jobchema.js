const { gql } = require('graphql-tag');

const typeDefs_User = gql`
  type Job {
    JobName : String!
    JobType : String!
    jobDecription : String!
    price : String!
    userId : String
    _id : String
    token : String
    status : String
    customerId : String
    
    

  }
  type JobUserId {
    userId : String
    _id : ID
    token : String
    status : String
  }




  input JobInput {
    JobName : String!
    JobType : String!
    jobDecription : String!
    price : String!
    userId : String
    status : String
    customerId : String
  }
  input JobUserGetInput {
    JobName : String!
   
  }
  input JobBookingGetInput {

    _id : String!
  }
  input JobStatusChangeInput {
    status : String
    _id : String
    customerId : String
  }




  type Query {
    Jobs : [Job]
    getJobbyName (JobName : String , status : String) : [Job!]!
    getJobNameType (JobName : String) : [Job!]!
    getJobBookedbyName ( customerId : String , status : String) :  [Job!]!
    getYourJob (userId : String) : [Job!]!
    getLastestJob (status : String) :[Job!]!


  }

  type Mutation {
    jobRegistion (input : JobInput ) : Job
    JobUserGet (input : JobUserGetInput) : Job
    jobBookingGet (input : JobBookingGetInput ) : JobUserId

    jobStatusChange (input : JobStatusChangeInput) : Job

    jobCancel (input : JobStatusChangeInput ) : Job

    jobDelete (input  : JobBookingGetInput ) : Job
   
  }

`;

module.exports = typeDefs_User;
