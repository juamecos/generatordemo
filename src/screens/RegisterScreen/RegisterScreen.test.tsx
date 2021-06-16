/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import RegisterScreen from './RegisterScreen';
import { RegisterScreenProps } from './RegisterScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<RegisterScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<RegisterScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('RegisterScreen');
  expect(element).toBeTruthy(); 
    
  });
});