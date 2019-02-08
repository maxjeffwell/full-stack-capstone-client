import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header';

describe('<Header />', () => {
  it('Should render without crashing', () => {
    shallow(<Header />);
  });
});
