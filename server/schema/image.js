const { gql } = require('graphql-tag');

const typeDefs_image = gql`
type Icon {
    id: ID!
    name: String!
    data: String!
    showIn : String
  }
  
  input IconInput {
    name: String!
    data: String!
    showIn : String
  }
  
  type Work {
    id: ID!
    name: String!
    icon: Icon!
    token : String
  }
  
  input WorkInput {
    name: String!
    icon: IconInput!
  }
  type Slider {
    id: ID!
    name: String!
    icon: Icon!
  }
  
  input SliderInput {
    name: String!
    icon: IconInput!
  }
  input chooseWorkInput {
    name :String
  }
  
  type Mutation {
    createIcon(input: IconInput!): Icon!
    createWork(input: WorkInput!): Work!
    createSlider(input: SliderInput!): Slider!
    chooseWork ( input : chooseWorkInput) : Work!
  }
  
  type Query {
    getIcon(id: ID!): Icon
    getAllIcons: [Icon!]!
    getIconByname (name : String) : Icon
    getIconMainScreen (showIn : String) : [Icon!]!

    getWork(id: ID!): Work
    getAllWorks: [Work!]!
  

    getSlider(id: ID!): Slider
    getAllSliders: [Slider!]!
  }
  
  



`
module.exports = typeDefs_image