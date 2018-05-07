import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import MockNetworkInterface from 'apollo-mocknetworkinterface';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
 
const typeDefs = `
  query readBlock {
    block {
      hash
      action
      raw
    }
  }
`;
 
const mocks = {};
 
const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({
  schema,
  mocks
});
 
const apolloCache = new InMemoryCache(window.__APOLLO_STATE__, { addTypename: false} );
 
const client = new ApolloClient({
  cache: apolloCache,
  link: new SchemaLink({ schema })
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App client={client}/>
      </ApolloProvider>,
    div);
  registerServiceWorker();
  ReactDOM.unmountComponentAtNode(div);
});
