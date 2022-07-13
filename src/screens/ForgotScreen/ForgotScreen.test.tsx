/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ForgotScreen from './ForgotScreen';
import { ForgotScreenProps } from './ForgotScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<ForgotScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<ForgotScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('ForgotScreen');
  expect(element).toBeTruthy(); 
    
  });
});