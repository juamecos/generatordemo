/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import SingleUserScreen from './SingleUserScreen';
import { SingleUserScreenProps } from './SingleUserScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<SingleUserScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<SingleUserScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('SingleUserScreen');
  expect(element).toBeTruthy(); 
    
  });
});