/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import CloseButton from './CloseButton';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<CloseButton />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<CloseButton {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('CloseButton');
  expect(element).toBeTruthy(); 
    
  });
});