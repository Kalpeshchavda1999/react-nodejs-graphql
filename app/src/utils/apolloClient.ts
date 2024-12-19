import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import store from '../store';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_GRAPHQL_URL,
});
const getAuthToken = () => {
  const state = store.getState();
  return state.auth.token ? `Bearer ${state.auth.token}` : '';
};

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: getAuthToken(),
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
