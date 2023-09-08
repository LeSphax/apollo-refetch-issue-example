const { gql } = require("apollo-server");

const typeDefs = gql`
  input string_comparison_exp {
    _eq: String
  }

  type Entity {
    id: String!
    name: String!
  }

  input where {
    name: string_comparison_exp
  }

  type Query {
    entities(where: where): [Entity]!
  }

  type Mutation {
    createEntity(name: String!): Boolean
  }
`;

module.exports = { typeDefs };
