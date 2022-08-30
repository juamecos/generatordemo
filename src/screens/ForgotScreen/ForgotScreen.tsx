import React, { FC, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import style from './ForgotScreenStyle';
import { ForgotScreenProps } from './ForgotScreenProps';
import Text from 'src/components/Text';
import CustomButton from 'src/components/CustomButton';
import { spacing, color } from 'src/theme';
import ForgotForm from 'src/components/Forms/ForgotForm';
import BackArrow from 'src/components/BackArrow';

/**
 * Screen component description
 *
 * @returns Screen
 */
const ForgotScreen: FC<ForgotScreenProps> = ({ route, navigation }) => {
	// From the previous screen
	const initialParams = route?.params;

	// Context

	// Custom hooks

	// Internal state

	useEffect(() => {}, []);

	// Component JSX
	return (
		<SafeAreaView
			// style={}
			testID='ForgotScreen'
			style={style.screenWrapper}
		>
			<Text h1 title='Reset Password - Email' style={style.title} />
			<ForgotForm />

			<BackArrow />
		</SafeAreaView>
	);
};

export default ForgotScreen;
