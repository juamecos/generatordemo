import 'react-native-gesture-handler';
import React from 'react';
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

if (__DEV__) {
	import('../config/ReactotronConfig').then(() =>
		console.log('Reactotron Configured')
	);
}

const App = () => {
	return (
		<PermissionsProvider>
			<ApolloProvider client={client}>
				<UserProvider>
					<AuthProvider>
						<NavigationContainer>
							<StoneProvider>
								<MainNavigator />
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
