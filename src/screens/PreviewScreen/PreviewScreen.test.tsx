/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import PreviewScreen from './PreviewScreen';
import { PreviewScreenProps } from './PreviewScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<PreviewScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<PreviewScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('PreviewScreen');
  expect(element).toBeTruthy(); 
    
  });
});