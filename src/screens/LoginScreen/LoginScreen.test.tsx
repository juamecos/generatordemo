/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import LoginScreen from './LoginScreen';
import { LoginScreenProps } from './LoginScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<LoginScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<LoginScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('LoginScreen');
  expect(element).toBeTruthy(); 
    
  });
});