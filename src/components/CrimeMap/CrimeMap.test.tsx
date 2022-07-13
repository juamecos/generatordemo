/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import CrimeMap from './CrimeMap';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<CrimeMap />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<CrimeMap {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('CrimeMap');
  expect(element).toBeTruthy(); 
    
  });
});