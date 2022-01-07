import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import SearchContainer from './components/SearchContainer';

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_DRUPAL_URL + '/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <SearchContainer />
    </ApolloProvider>
  );
}

export default App;
