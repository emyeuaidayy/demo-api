// Assuming you have defined Icon and Job models in separate files
const mongoDataMethod = require('../../data/db');
const { Icon, Work , Slider } = require('../../models/image');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    getIcon: async (_, { id }) => {
      return await Icon.findById(id);
    },
    getAllIcons: async () => {
      return await Icon.find();
    },
    getIconByname : async (parent, {name}, { mongoDataMethods })=> {
      return await mongoDataMethod.getIconByname(name)
    },
    getIconMainScreen : async (parent , {showIn} , {mongoDataMethods}) => await mongoDataMethod.getIconInMainScreen(showIn),

    getWork: async (_, { id }) => {
      return await Work.findById(id);
    },
    getAllWorks: async () => {
      return await Work.find();
    },
    getSlider: async (_, { id }) => {
      return await Slider.findById(id);
    },
    getAllSliders: async () => {
      return await Slider.find();
    },
  },
  Mutation: {
    createIcon: async (_, { input }) => {
      const { name, data ,showIn} = input;
      return await Icon.create({ name, data ,showIn });
    },
    createWork: async (_, { input }) => {
      const { name, icon } = input;
      const createdIcon = await Icon.create(icon);
      return await Work.create({ name, icon: createdIcon });
    },
    createSlider: async (_, { input }) => {
      const { name, icon } = input;
      const createdIcon = await Icon.create(icon);
      return await Slider.create({ name, icon: createdIcon });
    },
    chooseWork : async (parent , args ) => {
      const workchoose = await Work.findOne ({
        name : args.input.name
      })
      const token = jwt.sign({ WorkID: workchoose._id, name: workchoose.name }, 'your_secret_key', { expiresIn: '1h' });
      return {token}
    }
  },
  Work: {
    icon: async (parent) => {
      return await Icon.findById(parent.icon);
    },
  }, 
  Slider: {
    icon: async (parent) => {
      return await Icon.findById(parent.icon);
    },
  },
};

module.exports = resolvers;
