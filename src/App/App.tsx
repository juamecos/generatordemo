import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from 'src/navigation/MainNavigator';

const App = () => {
	return (
		<NavigationContainer>
			<MainNavigator />
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({});

export default App;
