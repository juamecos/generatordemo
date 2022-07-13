import 'react-native-gesture-handler';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AddStoneScreen from 'src/screens/AddStoneScreen';

import PermissionsScreen from 'src/screens/PermissionsScreen';
import { usePermissions } from '../../context/permissionsContext/permissionsContext';
import LoadingScreen from 'src/screens/LoadingScreen';

export type AddStackParamsList = {
	PermissionsScreen: undefined;
	AddStoneScreen: undefined;
};

const Stack = createStackNavigator<AddStackParamsList>();

const AddStackNavigator = () => {
	const { locationStatus } = usePermissions();

	if (locationStatus === 'unavailable') {
		return <LoadingScreen />;
	}
	return (
		<Stack.Navigator
			initialRouteName={'PermissionsScreen'}
			screenOptions={{
				headerShown: false,
				cardStyle: {
					backgroundColor: 'white',
				},
			}}
		>
			{locationStatus === 'denied' || locationStatus === 'blocked' ? (
				<Stack.Screen name='PermissionsScreen' component={PermissionsScreen} />
			) : (
				<>
					<Stack.Screen name='AddStoneScreen' component={AddStoneScreen} />
				</>
			)}
		</Stack.Navigator>
	);
};

export default AddStackNavigator;
