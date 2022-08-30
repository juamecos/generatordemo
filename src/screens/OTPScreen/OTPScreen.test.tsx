/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import OTPScreen from './OTPScreen';
import { OTPScreenProps } from './OTPScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<OTPScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<OTPScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('OTPScreen');
  expect(element).toBeTruthy(); 
    
  });
});