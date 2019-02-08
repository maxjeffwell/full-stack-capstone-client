import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../components/Dashboard';

describe('<Dashboard />', () => {
  it('Should render without crashing', () => {
    shallow(<Dashboard />);
  });
});
