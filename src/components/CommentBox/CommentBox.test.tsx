/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import CommentBox from './CommentBox';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<CommentBox />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<CommentBox {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('CommentBox');
  expect(element).toBeTruthy(); 
    
  });
});