// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Eos from 'eosjs';
import React, { Component } from 'react';
import logo from './logo.svg';
import ExpandRow from './ExpandRow';
import { withApollo, Query } from "react-apollo";
import gql from "graphql-tag";
import './App.css';
import './react-bootstrap-table.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.eos = Eos.Localnet({ httpEndpoint: "http://localhost:8888"});
    this.getBlocks = this.getBlocks.bind(this);
    this.getBlocks();
  }

  state = {
    skip: true,
  }

  fireInitialQuery () {
    this.setState(prevState => ({ ...prevState, skip: false }))
  }

  getBlocks() {
    this.eos.getInfo({}).then(result => {
      let lastBlock = result.head_block_num;
      let data = {block: []};
      let query = gql`
      {
        block {
          hash
          raw
          action
        }
      }`;
      
      for (let i = 0; i < 10; i++) {
        let block_id = lastBlock - i;
        this.eos.getBlock({block_num_or_id: block_id}).then(result => {
          
          this.props.client.writeQuery({
            id: block_id,
            query,
            data: {block: [...data.block, {
              hash: result.timestamp,
              raw: result,
              action: result.input_transactions.length,
            }]}
          });

          data = this.props.client.readQuery({query})

          if (i === 9) {
            this.fireInitialQuery()
          }
        });
      }
    });
  }
  
  render() {

    const query = gql`
    {
      block {
        hash,
        raw,
        action
      }
    }`;

    return (
      <div className="App">
      <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="./dist/react-bootstrap-table.min.css"/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
        <Query query={query} variables={{}} skip={this.state.skip}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
              <ExpandRow data={data.block}/>
            );
          }}
        </Query>
        </div>
        <p className="App-intro">
          <button type="button" onClick={this.getBlocks}> Load blocks</button>
        </p>
      </div>
    );
  }
}

export default withApollo(App);
