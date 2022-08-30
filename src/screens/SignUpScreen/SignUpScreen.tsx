import React, { FC, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import style from './SignUpScreenStyle';
import Text from 'src/components/Text';
import { SignUpScreenProps } from './SignUpScreenProps';
import SignUpForm from 'src/components/Forms/SignUpForm';
import CustomButton from 'src/components/CustomButton';
import { color, spacing } from 'src/theme';
import { useHolaQuery } from 'src/generated/graphql';
import BackArrow from 'src/components/BackArrow';

/**
 * Screen component description
 *
 * @returns Screen
 */
const SignUpScreen: FC<SignUpScreenProps> = ({ navigation }) => {
	useEffect(() => {}, []);

	// Component JSX
	return (
		<SafeAreaView
			// style={}
			testID='SignUpScreen'
			style={style.screenWrapper}
		>
			<Text h1 title='Signup' style={style.title} />
			<Text p title='Sign up to track and share your painted stones.' />
			<SignUpForm />
			<View style={style.buttonGroup}>
				<CustomButton
					textButton
					small
					title='Already have an account? Sign in'
					onPress={() => navigation?.navigate('LoginScreen')}
					styleText={{ color: color.secondary }}
					styleBtn={{ marginTop: spacing.vertical.micro }}
				/>
			</View>
			<BackArrow />
		</SafeAreaView>
	);
};

export default SignUpScreen;
