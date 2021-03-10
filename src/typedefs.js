const { gql } = require("apollo-server");

const typeDefs = gql`
  type Entity {
    id: String!
    name: String!
  }

  type Query {
    entities: [Entity]!
  }

  type Mutation {
    createEntity(name: String!): Boolean
  }
`;

module.exports = { typeDefs };
