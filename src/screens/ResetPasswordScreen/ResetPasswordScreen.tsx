import React, { FC, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import style from './ResetPasswordScreenStyle';
import { ResetPasswordScreenProps } from './ResetPasswordScreenProps';
import Title from 'src/components/Title';
import ResetPasswordForm from 'src/components/ResetPasswordForm';
import Text from 'src/components/Text';
import BackArrow from 'src/components/BackArrow';

/**
 * Screen component description
 *
 * @returns Screen
 */
const ResetPasswordScreen: FC<ResetPasswordScreenProps> = ({
	route,
	navigation,
}) => {
	// From the previous screen
	const initialParams = route?.params;

	const { email, otp } = initialParams;

	// Context

	// Custom hooks

	// Internal state

	useEffect(() => {}, []);

	// Component JSX
	return (
		<SafeAreaView style={style.screenWrapper} testID='ResetPasswordScreen'>
			<Text h1 title='Change your password' style={style.title} />
			<ResetPasswordForm email={email} otp={otp} />
			<BackArrow />
		</SafeAreaView>
	);
};

export default ResetPasswordScreen;
