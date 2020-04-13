import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://soundstock.herokuapp.com/v1/graphql",
});

export default client;
