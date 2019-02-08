import React from 'react';
import { shallow } from 'enzyme';
import Signout from '../components/auth/Signout';

describe('<Signout />', () => {
  it('Should render without crashing', () => {
    shallow(<Signout />);
  });
});
