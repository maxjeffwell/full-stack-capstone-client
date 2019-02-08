import React from 'react';
import { shallow } from 'enzyme';
import ChildComponent from '../components/authRequired';

describe('<ChildComponent />', () => {
  it('Should render without crashing', () => {
    shallow(<ChildComponent />);
  });
});
