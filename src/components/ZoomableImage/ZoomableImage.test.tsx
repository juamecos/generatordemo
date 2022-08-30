/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ZoomableImage from './ZoomableImage';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<ZoomableImage />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<ZoomableImage {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('ZoomableImage');
  expect(element).toBeTruthy(); 
    
  });
});