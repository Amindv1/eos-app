import React, { Component } from 'react';
import Eos from 'eosjs'
import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor() {
    super();
    this.eos = Eos.Testnet();
  }

  getBlocks() {
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button type="button" onClick="getBlocks()"> Load blocks</button>
        </p>
      </div>
    );
  }
}

export default App;
