import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';

describe('<App />', () => {
  it('Should render without crashing', () => {
    shallow(<App />);
  });
});
