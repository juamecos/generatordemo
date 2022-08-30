/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ForgotForm from './ForgotForm';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<ForgotForm />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<ForgotForm {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('ForgotForm');
  expect(element).toBeTruthy(); 
    
  });
});