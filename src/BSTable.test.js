import React from 'react';
import ReactDOM from 'react-dom';
import BSTable from './BSTable';
import toJson from 'enzyme-to-json';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

configure({ adapter: new Adapter() });

it('expand row shows raw data', () => {
  let data = [{raw: "str"}];
  const wrapper = shallow(<BSTable data={data}/>);
  expect(wrapper.find(BootstrapTable).length).toBe(1);
  expect(wrapper.find(TableHeaderColumn).length).toBe(1);
});