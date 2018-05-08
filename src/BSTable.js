import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React from 'react';

class BSTable extends React.Component {
  render() {
    if (this.props.data) {
      let style = { "tableLayout": "fixed", "wordWrap": "breakWord", whiteSpace: 'normal' }
      return (
        <BootstrapTable data={ this.props.data }>
          <TableHeaderColumn tdStyle={style} dataField='raw' isKey={true}>Raw data</TableHeaderColumn>
        </BootstrapTable>);
    } else {
      return (<p>?</p>);
    }
  }
}

export default BSTable;