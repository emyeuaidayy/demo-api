const AccountRegister = require('../../models/account/AccountRegister');
const jwt = require('jsonwebtoken');
const mongoDataMethod = require('../../data/db');



const account_resolvers = {

  Query : {
    getUserNamebyID: async (parent, { id }, mongoDataMethods) => {
     
      return await mongoDataMethod.getUserName(id);
    },

    getAllUser : async  (parent, args, { mongoDataMethods }) =>   await mongoDataMethod.getAllUser(),
    

  },



  Mutation: {
    registerAccount: async (parents, args, context, info) => {
      console.log(args);
      const newAccount = new AccountRegister({
        username: args.input.username,
        password: args.input.password,
        name: args.input.name,
        email: args.input.email,
        address: args.input.address,
        gender: args.input.gender,
        age: args.input.age,
        phone: args.input.phone,
      });

      return await newAccount.save();
    },

  

login: async (parents, args, context, info) => {
  const account = await AccountRegister.findOne({
    username: args.input.username,
    password: args.input.password,
  });
  if (!account) {
    throw new Error('Invalid username or password');
  }

  // Tạo token
  const token = jwt.sign({ accountId: account._id , name : account.name}, 'your_secret_key', { expiresIn: '1h' });


  // Gửi token cho client, ví dụ làm phản hồi của mutation login
  return {
    token,
  
  };
},

  },
};

module.exports = account_resolvers;
