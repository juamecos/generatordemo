/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ImageCarrousel from './ImageCarrousel';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<ImageCarrousel />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<ImageCarrousel {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('ImageCarrousel');
  expect(element).toBeTruthy(); 
    
  });
});