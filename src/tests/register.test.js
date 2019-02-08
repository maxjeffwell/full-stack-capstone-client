import React from 'react';
import { shallow } from 'enzyme';
import Register from '../components/auth/Register';

describe('<Register />', () => {
  it('Should render without crashing', () => {
    shallow(<Register />);
  });
});
