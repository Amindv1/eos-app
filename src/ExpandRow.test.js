import React from 'react';
import ReactDOM from 'react-dom';
import ExpandRow from './ExpandRow';
import toJson from 'enzyme-to-json';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

configure({ adapter: new Adapter() });

it('Expand row renderes without crashing', () => {
  const block = [{}]
  const data = {block}

  const component = shallow(<ExpandRow data={data.block}/>);
  expect(toJson(component)).toMatchSnapshot();
});

it('bootstrap table present', () => {
  const block = [{
    hash: 1,
    raw: "some string",
    action: 0
  },
  {
    hash: 2,
    raw: "some string",
    action: 0
  },
  {
    hash: 3,
    raw: "some string",
    action: 0
  }]
  const data = {block}

  const wrapper = shallow(<ExpandRow data={data.block}/>);
  expect(wrapper.find(BootstrapTable).length).toBe(1);
  expect(wrapper.find(TableHeaderColumn).length).toBe(2);
});

it('expand row shows raw data', () => {
  const block = [{
    hash: 1,
    raw: "rawdata",
    action: 0
  }]
  const data = {block}
  const wrapper = mount((
    <ExpandRow data={data.block}/>
  ));
  expect(wrapper.find('ExpandComponent').props().hidden).toBe(true)
  expect(wrapper.find('tr').length).toBe(5);
  expect(wrapper.find('td[children="1"]').length).toBe(1);
  expect(toJson(wrapper)).toMatchSnapshot();

  wrapper.find('td[children="1"]').simulate('click');
  
  expect(wrapper.find('ExpandComponent').props().hidden).toBe(false)
  expect(toJson(wrapper)).toMatchSnapshot();
});
