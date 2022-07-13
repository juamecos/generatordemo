import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from 'src/screens/LoginScreen';
import SignUpScreen from 'src/screens/SignUpScreen';
import HomeTabsNavigator from '../HomeTabsNavigator/HomeTabsNavigator';
import ForgotScreen from 'src/screens/ForgotScreen';
import { useAuth } from 'src/context/authContext/authContext';
import { useUser } from 'src/context/userContext.tsx/userContext';
import { useMeQuery } from '../../generated/graphql';
import LoadingScreen from '../../screens/LoadingScreen/LoadingScreen';
import { getToken, isTokenValid, removeToken } from '../../utils/tokens';
import CommentsScreen from 'src/screens/CommentsScreen';
import SingleStoneScreen from 'src/screens/SingleStoneScreen';
import { color } from 'src/theme';
import ImagePickerScreen from 'src/screens/ImagePickerScreen';
import LocationScreen from 'src/screens/LocationScreen';
import DescriptionScreen from 'src/screens/DescriptionScreen';
import PreviewScreen from 'src/screens/PreviewScreen';
import SingleUserScreen from 'src/screens/SingleUserScreen';
import { IStone } from '../../interfaces/IStone';
import { usePermissions } from 'src/context/permissionsContext/permissionsContext';
import PermissionsScreen from '../../screens/PermissionsScreen/PermissionsScreen';

export type StackParamList = {
	HomeScreen: undefined;
	LoadingScreen: undefined;
	PermissionsScreen: undefined;
	HomeTabsNavigatorScreen: undefined;
	CommentsScreen: undefined;
	SingleStoneScreen: undefined;
	SingleUserScreen: undefined;
	ImagePickerScreen: undefined;
	LocationScreen: undefined;
	DescriptionScreen: undefined;
	PreviewScreen: undefined;
	LoginScreen: undefined;
	SignUpScreen: undefined;
	ForgotScreen: undefined;
};

// Just moking autentication

const Stack = createStackNavigator<StackParamList>();

const Navigator = () => {
	const { token, status, signOut } = useAuth();
	const { setUser, removeUser } = useUser();
	const { locationStatus } = usePermissions();

	const isPermissionGranted =
		locationStatus === 'denied' || locationStatus === 'blocked' ? false : true;

	const { data, loading, error, refetch } = useMeQuery({
		fetchPolicy: 'network-only',
	});

	useEffect(() => {
		try {
			if (loading) {
				return <LoadingScreen />;
			}
			if (token && data?.me?.user) {
				console.log(data.me.user);

				refetch();
				setUser(data.me.user);
			} else {
				getToken().then(t => {
					if (!isTokenValid(t)) {
						signOut();
						removeUser();
					}
				});
			}
		} catch (err) {
			console.log(err);

			signOut();
			removeUser();
		}
	}, []);

	useEffect(() => {
		try {
			if (token && data?.me?.user) {
				refetch();
				setUser(data?.me?.user);
			} else {
				getToken().then(t => {
					if (!isTokenValid(t)) {
						signOut();
						removeUser();
					}
				});
			}
		} catch (err) {
			console.log(err);

			signOut();
			removeUser();
		}
	}, [data]);

	return (
		<Stack.Navigator
			initialRouteName={'PermissionsScreen'}
			screenOptions={{
				headerShown: false,
				cardStyle: {
					backgroundColor: color.palette.offWhite,
				},
			}}
		>
			{status === 'Checking' && (
				<Stack.Screen name='LoadingScreen' component={LoadingScreen} />
			)}
			{!isPermissionGranted && status === 'Authenticated' && (
				<Stack.Screen name='PermissionsScreen' component={PermissionsScreen} />
			)}
			{status === 'Authenticated' ? (
				<>
					<Stack.Screen
						name='HomeTabsNavigatorScreen'
						component={HomeTabsNavigator}
					/>
					<Stack.Screen name='CommentsScreen' component={CommentsScreen} />
					<Stack.Screen
						name='SingleStoneScreen'
						component={SingleStoneScreen}
					/>
					<Stack.Screen name='SingleUserScreen' component={SingleUserScreen} />
					<Stack.Screen
						name='ImagePickerScreen'
						component={ImagePickerScreen}
					/>
					<Stack.Screen name='LocationScreen' component={LocationScreen} />
					<Stack.Screen
						name='DescriptionScreen'
						component={DescriptionScreen}
					/>
					<Stack.Screen name='PreviewScreen' component={PreviewScreen} />
				</>
			) : (
				<>
					<Stack.Screen name='LoginScreen' component={LoginScreen} />
					<Stack.Screen name='SignUpScreen' component={SignUpScreen} />
					<Stack.Screen name='ForgotScreen' component={ForgotScreen} />
				</>
			)}
		</Stack.Navigator>
	);
};

export default Navigator;
