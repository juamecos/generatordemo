import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from 'src/navigation/MainNavigator';
import { ApolloProvider } from '@apollo/client';
import client from 'src/apollo/client';
import Toast from 'react-native-toast-message';
import { AuthProvider } from 'src/context/authContext/authContext';
import { UserProvider } from 'src/context/userContext.tsx/userContext';
import { PermissionsProvider } from 'src/context/permissionsContext/premissionsProvider';
import { StoneProvider } from 'src/context/stoneContext/stoneContext';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import Text from 'src/components/Text';
import { color, spacing } from 'src/theme';
import { FoundProvider } from 'src/context/foundContext/foundContext';

if (__DEV__) {
	import('../config/ReactotronConfig').then(() =>
		console.log('Reactotron Configured')
	);
}

const App = () => {
	const { type, isConnected, isInternetReachable, details } = useNetInfo();
	console.log('type', type);
	console.log('isconnected', isConnected);
	console.log('isInternetReachable', isInternetReachable);
	console.log('details', details);

	return (
		<PermissionsProvider>
			{!isConnected && (
				<Text
					title={'No Internet Connection'}
					textColor={color.white}
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: color.palette.orange,
					}}
				/>
			)}
			<ApolloProvider client={client}>
				<UserProvider>
					<AuthProvider>
						<NavigationContainer>
							<StoneProvider>
								<FoundProvider>
									<MainNavigator />
								</FoundProvider>
							</StoneProvider>
						</NavigationContainer>
					</AuthProvider>
				</UserProvider>
				<Toast />
			</ApolloProvider>
		</PermissionsProvider>
	);
};

const styles = StyleSheet.create({});

export default App;
