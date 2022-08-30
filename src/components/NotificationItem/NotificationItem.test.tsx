/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import NotificationItem from './NotificationItem';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<NotificationItem />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<NotificationItem {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('NotificationItem');
  expect(element).toBeTruthy(); 
    
  });
});