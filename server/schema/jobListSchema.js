
const gql = require ('graphql-tag')

const typeDefs_jobList = gql  `

   type JobData {
    id : ID
    name : String 
    jobType_1 : String
    jobType_2 : String
    jobType_3 : String
    jobType_4 : String
    jobType_5 : String
    jobType_6 : String
    token : String

   }
   input JobDataInput {
    name : String 
    jobType_1 : String
    jobType_2 : String
    jobType_3 : String
    jobType_4 : String
    jobType_5 : String
    jobType_6 : String
   }

   input chooseJobInput {
        name : String!

   }
   type choosejob {
    name : String! 
    id : ID 
    token : String
   }
  input getUserJobbyTypeInput{
    jobType_1 : String
    jobType_2 : String
    jobType_3 : String
    jobType_4 : String
    jobType_5 : String
    jobType_6 : String
  }

    type Query {
        showJobData : [JobData]
        getJobbyId (id : String) : JobData
       

    }

    type Mutation {
       creatJobData (input : JobDataInput) : JobData
       chooseJob (input : chooseJobInput!) : choosejob
     
 

    }


`
module.exports = typeDefs_jobList