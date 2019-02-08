import React from 'react';
import { shallow } from 'enzyme';
import Landing from '../components/Landing';

describe('<Landing />', () => {
  it('Should render without crashing', () => {
    shallow(<Landing />);
  });
});
