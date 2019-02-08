import React from 'react';
import { shallow } from 'enzyme';
import UpdateStudent from '../components/UpdateStudent';

describe('<UpdateStudent />', () => {
  it('Should render without crashing', () => {
    shallow(<UpdateStudent />);
  });
});
