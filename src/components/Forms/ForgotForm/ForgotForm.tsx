import { Field } from 'formik';
import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import FormContainer from '../FormContainer';
import SubmitButton from '../SubmitButton';
import FormField from 'src/components/Forms/Field';
import styles from './ForgotFormStyle';
import { forgotValidationSchema } from 'src/utils/ValidationSchema';
import { useResetPasswordEmailMutation } from 'src/generated/graphql';
import { useNavigation } from '@react-navigation/native';

interface IValues {
	email: string;
}

const initialValuesObject: IValues = {
	email: '',
};

const ForgotForm = () => {
	const isMounted = useRef(true);
	const { navigate } = useNavigation();
	const [resetPasswordEmail, { data, loading, error }] =
		useResetPasswordEmailMutation({
			fetchPolicy: 'network-only',
		});

	React.useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	React.useEffect(() => {
		if (error) {
			Toast.show({
				type: 'error',
				text1: error.message!,
			});
		}
		if (data && !data?.resetPasswordEmail?.status) {
			Toast.show({
				type: 'error',
				text1: data.resetPasswordEmail?.message!,
			});
		}
		if (!loading && data?.resetPasswordEmail?.mail?.to) {
			Toast.show({
				type: 'success',
				text1: data.resetPasswordEmail?.message!,
			});

			navigate('OTPScreen', { email: data?.resetPasswordEmail.mail.to });

			isMounted.current = false;
		}
	}, [data, loading, error]);
	return (
		<View testID='forgot-form'>
			<FormContainer
				testID='forgot-form'
				initialValues={{
					email: '',
				}}
				validationSchema={forgotValidationSchema}
				onSubmit={async (values: IValues, { resetForm }: any) => {
					try {
						await resetPasswordEmail({
							variables: {
								email: values.email,
							},
						});
					} catch (err) {
						console.log(err);
					}
				}}
			>
				<View>
					<Field
						component={FormField}
						name='email'
						label='E-mail'
						autoCompleteType='email'
						keyboardType='email-address'
						textContentType='emailAddress'
					/>
				</View>

				<SubmitButton title='Submit' />
			</FormContainer>
		</View>
	);
};

export default ForgotForm;
