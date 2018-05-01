import React, { Component } from 'react';
import Eos from 'eosjs'
import logo from './logo.svg';
import './App.css';
import {BootstrapTable, 
  TableHeaderColumn} from 'react-bootstrap-table';
import './react-bootstrap-table.css';


class App extends Component {

  constructor() {
    super();
    this.eos = Eos.Testnet();
  }

  getBlocks() {
  }

  getInitialState() {
    return {
      rows: ['row 1', 'row 2', 'row 3']
    }
  }
  
  render() {
    var data = [
      // {id: 1, name: 'Gob', value: '2'},
      // {id: 2, name: 'Buster', value: '5'},
      // {id: 3, name: 'George Michael', value: '4'}
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
        <BootstrapTable data={data}>
          <TableHeaderColumn isKey dataField='hash of block timestamp'>
            Block Timestamp Hash
          </TableHeaderColumn>
          <TableHeaderColumn dataField='actions'>
            Actions
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
        <p className="App-intro">
          <button type="button" onClick="getBlocks()"> Load blocks</button>
        </p>
      </div>
    );
  }
}

export default App;
