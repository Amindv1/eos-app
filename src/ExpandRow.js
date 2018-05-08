import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React from 'react';
import BSTable from './BSTable'

class ExpandRow extends React.Component {
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