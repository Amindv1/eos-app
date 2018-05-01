import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Eos from 'eosjs';
import React, { Component } from 'react';
import logo from './logo.svg';
import ExpandRow from './ExpandRow';
import './App.css';
import './react-bootstrap-table.css';

class App extends Component {

  constructor() {
    super();
    this.eos = Eos.Testnet();
  }

  getBlocks() {
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
          <button type="button" onClick="getBlocks()"> Load blocks</button>
        </p>
      </div>
    );
  }
}

export default App;
