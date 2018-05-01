import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, { Component } from 'react';

class BSTable extends React.Component {
  render() {
    if (this.props.data) {
      return (
        <BootstrapTable data={ this.props.data }>
          <TableHeaderColumn dataField='fieldA' isKey={ true }>Field A</TableHeaderColumn>
          <TableHeaderColumn dataField='fieldB'>Field B</TableHeaderColumn>
          <TableHeaderColumn dataField='fieldC'>Field C</TableHeaderColumn>
          <TableHeaderColumn dataField='fieldD'>Field D</TableHeaderColumn>
        </BootstrapTable>);
    } else {
      return (<p>?</p>);
    }
  }
}

class ExpandRow extends React.Component {
  constructor(props) {
    super(props);
  }

  isExpandableRow(row) {
    return true;
  }

  expandComponent(row) {
    return (
      <BSTable data={ row.expand } />
    );
  }

  render() {
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)',
    };
    const data = [];

    return (
      <BootstrapTable data={ this.props.data }
        options={ options }
        expandableRow={ this.isExpandableRow }
        expandComponent={ this.expandComponent }
        search>
        <TableHeaderColumn dataField='hash' isKey={ true }>Block Timestamp Hash</TableHeaderColumn>
        <TableHeaderColumn dataField='action' >Action</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default ExpandRow;