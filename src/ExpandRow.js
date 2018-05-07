import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, { Component } from 'react';

class BSTable extends React.Component {
  render() {
    if (this.props.data) {
      let style = { "table-layout": "fixed", "word-wrap": "break-word", whiteSpace: 'normal' }
      return (
        <BootstrapTable data={ this.props.data }>
          <TableHeaderColumn tdStyle={style} dataField='raw' isKey={true}>Raw data</TableHeaderColumn>
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
    let str = JSON.stringify(row.raw);
    let newData = [{raw: str}];

    return (
      <BSTable data={ newData } />
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