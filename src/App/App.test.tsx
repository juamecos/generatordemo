import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';


import MainNavigator from 'src/navigation/MainNavigator';
import App from './App';



const createTestProps = (props: object) => ({
  ...props,
});


describe('<App />', () => {
  const props = createTestProps({});
  

  test.skip('renders the correct screen', async () => {
    const {getByText} = render(
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    );
    await waitFor(()=> getByText('HomeScreen'));
  });
});