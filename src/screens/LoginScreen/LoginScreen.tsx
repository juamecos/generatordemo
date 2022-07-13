import React, { FC, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import style from './LoginScreenStyle';
import { LoginScreenProps } from './LoginScreenProps';

import Text from 'src/components/Text';
import LoginForm from 'src/components/Forms/LoginForm';
import CustomButton from 'src/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { color, spacing } from 'src/theme';

/**
 * Screen component description
 *
 * @returns Screen
 */

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
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
			<CustomButton
				textButton
				small
				title="Don't you have an account? Sign Up"
				onPress={() => navigation?.navigate('SignUpScreen')}
				styleText={{
					color: color.secondary,
					paddingBottom: spacing.vertical.tiny,
				}}
			/>
			<CustomButton
				textButton
				small
				title='Forgot your password?'
				onPress={() => navigation?.navigate('ForgotScreen')}
				styleText={{ color: color.dim }}
			/>
		</SafeAreaView>
	);
};

export default LoginScreen;
