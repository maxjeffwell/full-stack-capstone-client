import React from 'react';
import { shallow } from 'enzyme';
import Students from '../components/auth/Students';

describe('<Students />', () => {
  it('Should render without crashing', () => {
    shallow(<Students />);
  });
});
