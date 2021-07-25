import React, { FC, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import style from './LoginScreenStyle';
import { LoginScreenProps } from './LoginScreenProps';

import Text from 'src/components/Text';
import LoginForm from 'src/components/Forms/LoginForm';

/**
 * Screen component description
 *
 * @returns Screen
 */

const LoginScreen: FC<LoginScreenProps> = () => {
	// From the previous screen
	// const initialParams = route?.params;

	// Context

	// Custom hooks

	// Internal state

	useEffect(() => {}, []);

	// Component JSX
	return (
		<SafeAreaView style={style.screenWrapper} testID='LoginScreen'>
			<Text h1 title='Login' style={style.title} />
			<LoginForm />
		</SafeAreaView>
	);
};

export default LoginScreen;
