/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import DescriptionScreen from './DescriptionScreen';
import { DescriptionScreenProps } from './DescriptionScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<DescriptionScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<DescriptionScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('DescriptionScreen');
  expect(element).toBeTruthy(); 
    
  });
});