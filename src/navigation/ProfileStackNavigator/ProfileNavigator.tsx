import 'react-native-gesture-handler';
import React from 'react';
import {
	createStackNavigator,
	StackNavigationProp,
} from '@react-navigation/stack';
import ProfileScreen from 'src/screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from 'src/screens/EditProfileScreen';
import { RouteProp } from '@react-navigation/native';

export type ProfileStackParamList = {
	ProfileScreen: { userId: number } | undefined;
	EditProfileScreen: undefined;
};

type ProfileScreenRouteProp = RouteProp<ProfileStackParamList, 'ProfileScreen'>;

type ProfileScreenNavigationProp = StackNavigationProp<
	ProfileStackParamList,
	'ProfileScreen'
>;

export type ProfileStackProps = {
	route: ProfileScreenRouteProp;
	navigation: ProfileScreenNavigationProp;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName={'ProfileScreen'}
			screenOptions={{
				headerShown: false,
				cardStyle: {
					backgroundColor: 'white',
				},
			}}
		>
			<Stack.Screen name='ProfileScreen' component={ProfileScreen} />
			<Stack.Screen name='EditProfileScreen' component={EditProfileScreen} />
		</Stack.Navigator>
	);
};

export default ProfileNavigator;
