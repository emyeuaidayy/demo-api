const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mongoDataMethods = require ('./data/db');

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Home-service');
    console.log('Connected to database home-service ;)');
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();

const typeDefs_account = require('./schema/Accountschema');
const typeDefs_Job = require('./schema/Jobchema');
const typeDefs_jobList = require('./schema/jobListSchema');
const typeDefs_Img = require('./schema/image');

const account_resolvers = require('./resolver/account/accountResolver');
const user_Job = require('./resolver/jobRegistion/jobRegistion');
const jobList_resolvers = require('./resolver/jobList/jobList');
const image_resolver = require('./resolver/image/image');

const mongoDataMethod = require('./data/db');

const server = new ApolloServer({
  typeDefs: [typeDefs_account, typeDefs_Job, typeDefs_jobList, typeDefs_Img],
  resolvers: [account_resolvers, user_Job, jobList_resolvers, image_resolver],
  context: () => ({ mongoDataMethod }),
});

const app = express();

// Increase maximum payload size
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 3000 }, () =>
    console.log(`Server ready at http://localhost:3000${server.graphqlPath}`)
  );
});


return { server, app };



