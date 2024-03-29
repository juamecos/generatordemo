/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import PermissionsComponent from './PermissionsComponent';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<PermissionsComponent />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<PermissionsComponent {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('PermissionsComponent');
  expect(element).toBeTruthy(); 
    
  });
});