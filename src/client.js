const fetch = require("node-fetch");
const { ApolloClient, InMemoryCache, gql } = require("@apollo/client/core");
const { typeDefs } = require("./typedefs");

global.fetch = (...args) => {
  const { operationName } = JSON.parse(args[1].body);
  const isMutation = operationName === "CreateEntity";

  if (isMutation) {
    console.log("--------------------------------");
  }

  console.log(
    `${
      isMutation ? "MUTATION" : "QUERY"
    } | HTTP fetch called. Operation -> ${operationName}`
  );

  return fetch(...args);
};

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  typeDefs,
});

const getEntitiesDocument = gql`
  query GetEntities($name: string_comparison_exp) {
    entities(where: { name: $name }) {
      id
      name
    }
  }
`;

client
  .watchQuery({
    query: getEntitiesDocument,
    variables: {
      name: {_eq: "Name"},
    },
    fetchPolicy: "network-only",
  })
  .subscribe();

setInterval(() => {
  client
    .mutate({
      mutation: gql`
        mutation CreateEntity($name: String!) {
          createEntity(name: $name)
        }
      `,
      variables: {
        name: "Name",
      },
      refetchQueries: [{ query: getEntitiesDocument }],
    })
    .then(() => {});
}, 3000);
