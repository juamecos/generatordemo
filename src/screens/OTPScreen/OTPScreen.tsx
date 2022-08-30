import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView, Pressable, Keyboard, View } from 'react-native';
import styles from './OTPScreenStyle';
import { OTPScreenProps } from './OTPScreenProps';
import BackArrow from 'src/components/BackArrow';
import Text from 'src/components/Text';
import OTPInputField from '../../components/OTPInputField/OTPInputField';
import CustomButton from 'src/components/CustomButton';
import { useOtpCheckMutation } from 'src/generated/graphql';
import Toast from 'react-native-toast-message';

/**
 * Screen component description
 *
 * @returns Screen
 */
const OTPScreen: FC<OTPScreenProps> = ({ route, navigation }) => {
	// From the previous screen
	const initialParams = route?.params;

	const { email } = initialParams;

	const [code, setCode] = useState('');
	const [pinReady, setPinReady] = useState(false);

	const MAX_CODE_LENGTH = 6;

	const [otpCheck, { data, error, loading }] = useOtpCheckMutation({
		fetchPolicy: 'network-only',
	});

	useEffect(() => {
		if (loading) {
			console.log('loading');

			Toast.show({
				type: 'info',
				text1: 'Loading',
			});
		}
		if (error) {
			Toast.show({
				type: 'error',
				text1: error.message,
			});
		}
		if (data) {
			Toast.show({
				type: data?.otpCheck?.status ? 'success' : 'error',
				text1: data.otpCheck?.message,
			});
			if (data?.otpCheck?.status) {
				navigation?.navigate('ResetPasswordScreen', {
					email: email,
					otp: code,
				});
				setCode('');
			}

			if (!data?.otpCheck?.status) {
				setCode('');
				setPinReady(false);
			}
		}

		return () => {};
	}, [data, error, loading]);

	const handleSubmit = async () => {
		try {
			await otpCheck({
				variables: {
					email,
					otp: code,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	// Component JSX
	return (
		<Pressable
			style={styles.screenWrapper}
			testID='OTPScreen'
			onPress={Keyboard.dismiss}
		>
			<Text h1 title='Reset Password - Enter code' style={styles.title} />
			<OTPInputField
				setPinReady={setPinReady}
				code={code}
				setCode={setCode}
				maxLength={MAX_CODE_LENGTH}
			/>
			<View style={styles.buttonWrapper}>
				<CustomButton
					rounded
					medium
					disabled={!pinReady}
					title={`SUBMIT`}
					onPress={handleSubmit}
				/>
			</View>
			<BackArrow />
		</Pressable>
	);
};

export default OTPScreen;
