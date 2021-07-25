import React, { FC, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import style from './SignUpScreenStyle';
import Text from 'src/components/Text';
import { SignUpScreenProps } from './SignUpScreenProps';
import SignUpForm from 'src/components/Forms/SignUpForm';
import CustomButton from 'src/components/CustomButton';

/**
 * Screen component description
 *
 * @returns Screen
 */
const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
	// Context

	// Custom hooks

	// Internal state

	useEffect(() => {}, []);

	// Component JSX
	return (
		<SafeAreaView
			// style={}
			testID='SignUpScreen'
			style={style.screenWrapper}
		>
			<Text h1 title='Signup' style={style.title} />

			<SignUpForm />
			<View style={style.buttonGroup}>
				<CustomButton
					primary
					secondary
					small
					rounded
					title='Login'
					onPress={() => navigation?.navigate('LoginScreen')}
				/>
				<CustomButton
					textButton
					small
					title='Forgot Password'
					onPress={() => {}} // TODO create forgot password screen
				/>
			</View>
		</SafeAreaView>
	);
};

export default SignUpScreen;
