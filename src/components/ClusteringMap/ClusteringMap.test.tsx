/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ClusteringMap from './ClusteringMap';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<ClusteringMap />', () => {
  const props = createTestProps({});
  const { getByTestId } = render(<ClusteringMap {...props}/>);

  test('renders correctly', () => {
  const element = getByTestId('ClusteringMap');
  expect(element).toBeTruthy(); 
    
  });
});