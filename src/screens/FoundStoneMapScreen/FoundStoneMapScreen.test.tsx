/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import FoundStoneMapScreen from './FoundStoneMapScreen';
import { FoundStoneMapScreenProps } from './FoundStoneMapScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<FoundStoneMapScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<FoundStoneMapScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('FoundStoneMapScreen');
  expect(element).toBeTruthy(); 
    
  });
});