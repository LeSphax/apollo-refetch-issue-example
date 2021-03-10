const { ApolloServer } = require("apollo-server");
const { v4 } = require("uuid");
const { typeDefs } = require("./typedefs");

const entities = [];

const resolvers = {
  Query: {
    entities() {
      console.log("INFO | QUERY handler called");

      return entities;
    },
  },

  Mutation: {
    createEntity(_, { name }) {
      console.log("--------------------------------");
      console.log("INFO | MUTATION handler called");

      const id = v4();

      entities.push({
        id,
        name: `${name} -> ${id}`,
      });

      return true;
    },
  },
};

new ApolloServer({ typeDefs, resolvers }).listen().then(({ url }) => {
  console.log(`INFO | Server started -> ${url}`);
});
