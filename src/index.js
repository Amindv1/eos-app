import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';

const cache = new InMemoryCache({addTypename: false});
const httpLink = new HttpLink({ uri: 'http://localhost:8888/v1/chain'});
const client = new ApolloClient({
  link: httpLink,
  cache,
});

ReactDOM.render(
<ApolloProvider client={client}> 
<App client={client}/> 
</ApolloProvider>, 
document.getElementById('root'));
registerServiceWorker();
