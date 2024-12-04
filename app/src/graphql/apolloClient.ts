// src/app/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT, // Replace with your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;
