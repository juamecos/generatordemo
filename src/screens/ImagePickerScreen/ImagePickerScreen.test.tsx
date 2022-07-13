/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ImagePickerScreen from './ImagePickerScreen';
import { ImagePickerScreenProps } from './ImagePickerScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<ImagePickerScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<ImagePickerScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('ImagePickerScreen');
  expect(element).toBeTruthy(); 
    
  });
});