/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ClusterMap from './ClusterMap';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<ClusterMap />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<ClusterMap {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('ClusterMap');
  expect(element).toBeTruthy(); 
    
  });
});