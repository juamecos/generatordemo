/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import WelcomeScreen from './WelcomeScreen';
import { WelcomeScreenProps } from './WelcomeScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<WelcomeScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<WelcomeScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('WelcomeScreen');
  expect(element).toBeTruthy(); 
    
  });
});