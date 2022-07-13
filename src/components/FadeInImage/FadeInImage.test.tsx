/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import FadeInImage from './FadeInImage';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<FadeInImage />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<FadeInImage {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('FadeInImage');
  expect(element).toBeTruthy(); 
    
  });
});