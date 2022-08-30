/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ResetPasswordScreen from './ResetPasswordScreen';
import { ResetPasswordScreenProps } from './ResetPasswordScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<ResetPasswordScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<ResetPasswordScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('ResetPasswordScreen');
  expect(element).toBeTruthy(); 
    
  });
});