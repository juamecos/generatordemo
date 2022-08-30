/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import OTPInputField from './OTPInputField';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<OTPInputField />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<OTPInputField {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('OTPInputField');
  expect(element).toBeTruthy(); 
    
  });
});