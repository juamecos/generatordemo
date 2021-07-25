import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from 'src/screens/HomeScreen';
import AboutScreen from 'src/screens/AboutScreen';
import LoginScreen from 'src/screens/LoginScreen';
import SignUpScreen from 'src/screens/SignUpScreen';

export type StackParamList = {
	HomeScreen: undefined;
	AboutScreen: undefined;
};

const Stack = createStackNavigator();

const Navigator = () => {
	return (
		<Stack.Navigator
			initialRouteName={'SignUpScreen'}
			screenOptions={{
				headerShown: false,
				cardStyle: {
					backgroundColor: 'white',
				},
			}}
		>
			<Stack.Screen name='HomeScreen' component={HomeScreen} />
			<Stack.Screen name='AboutScreen' component={AboutScreen} />
			<Stack.Screen name='LoginScreen' component={LoginScreen} />
			<Stack.Screen name='SignUpScreen' component={SignUpScreen} />
		</Stack.Navigator>
	);
};

export default Navigator;
