import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../components/Footer';

describe('<Footer />', () => {
  it('Should render without crashing', () => {
    shallow(<Footer />);
  });
});
