import React from 'react';
import { shallow } from 'enzyme';
import Signin from '../components/auth/Signin';

describe('<Signin />', () => {
  it('Should render without crashing', () => {
    shallow(<Signin />);
  });
});
