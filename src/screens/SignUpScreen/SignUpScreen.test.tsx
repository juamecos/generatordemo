/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import SignUpScreen from './SignUpScreen';
import { SignUpScreenProps } from './SignUpScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<SignUpScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<SignUpScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('SignUpScreen');
  expect(element).toBeTruthy(); 
    
  });
});