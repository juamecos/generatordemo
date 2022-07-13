/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import CommentsScreen from './CommentsScreen';
import { CommentsScreenProps } from './CommentsScreenProps';


const createTestProps = (props: object) => ({
  ...props,
});


describe('<CommentsScreen />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<CommentsScreen {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('CommentsScreen');
  expect(element).toBeTruthy(); 
    
  });
});