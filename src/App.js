// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Eos from 'eosjs';
import React, { Component } from 'react';
import logo from './logo.svg';
import ExpandRow from './ExpandRow';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { withApollo, ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import './App.css';
import './react-bootstrap-table.css';
import { makeExecutableSchema } from 'graphql-tools';
import fetch from 'node-fetch';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.eos = Eos.Localnet({ httpEndpoint: "http://localhost:8888"});
    this.getBlocks = this.getBlocks.bind(this);
  }

  getBlocks() {

    this.eos.getInfo({}).then(result => {
      let lastBlock = result.head_block_num;
      for (let i = 0; i < 10; i++) {
        let block_id = lastBlock - i;
        this.eos.getBlock({block_num_or_id: block_id}).then(result => {
          console.log(result);
          this.props.client.writeQuery({
            query: gql`
            query writeBlock {
              block(raw: String, count: String, timestamp: String) {
                timestamp
                raw
                count
              }
            }`,
            data: {id: result.id, block: {
              timestamp: result.timestamp,
              raw: result,
              count: result.input_transactions.length,
            }}
          });

          const data = this.props.client.readQuery({
            query: gql`
            query readBlock {
              block(raw: String, count: String, timestamp: String) {
                timestamp
                raw
                count
              }
            }`
          });
          console.log(data);
        });
      }
    });
  }
  
  render() {
    var data = [
      {
        hash: 1, 
        action: 'Gob',
        expand: [ {
          fieldA: 'test1',
          fieldB: 'swag',
          fieldC: Math.random(),
          fieldD: '123eedd',
        }, {
          fieldA: 'test1',
          fieldC: Math.random(),
          fieldD: '123eedd',
        } ]
      },
      {
        hash: 2, 
        action: 'Gob',
        expand: [ {
          fieldA: 'test2',
          fieldC: Math.random(),
          fieldD: '123eedd',
        }, {
          fieldA: 'test1',
          fieldC: Math.random(),
          fieldD: '123eedd',
        } ]
      },
      {
        hash: 3, 
        action: 'Gob',
        expand: [ {
          fieldA: 'test3',
          fieldC: Math.random(),
          fieldD: '123eedd',
        }, {
          fieldA: 'test1',
          fieldC: Math.random(),
          fieldD: '123eedd',
        } ]
      },
    ];

    return (
      <div className="App">
      <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="./dist/react-bootstrap-table.min.css"/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <ExpandRow data={data}/>
        </div>
        <p className="App-intro">
          <button type="button" onClick={this.getBlocks}> Load blocks</button>
        </p>
      </div>
    );
  }
}

export default withApollo(App);
