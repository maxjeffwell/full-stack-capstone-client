import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../components/Sidebar';

describe('<Sidebar />', () => {
  it('Should render without crashing', () => {
    shallow(<Sidebar />);
  });
});
