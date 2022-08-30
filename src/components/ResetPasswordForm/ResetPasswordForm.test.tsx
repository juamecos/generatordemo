/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ResetPasswordForm from './ResetPasswordForm';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<ResetPasswordForm />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<ResetPasswordForm {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('ResetPasswordForm');
  expect(element).toBeTruthy(); 
    
  });
});