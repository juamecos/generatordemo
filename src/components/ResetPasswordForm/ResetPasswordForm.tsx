import React, { useRef } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormContainer from '../Forms/FormContainer';
import { resetPasswordValidationSchema } from 'src/utils/ValidationSchema';
import { Field } from 'formik';
import FormField from 'src/components/Forms/Field';
import SubmitButton from '../Forms/SubmitButton';
import { useResetPasswordActionMutation } from '../../generated/graphql';
import Toast from 'react-native-toast-message';

export type Props = {
	email: string;
	otp: string;
};

interface IValues {
	password: string;
	confirmPassword: string;
}

const initialValuesObject: IValues = {
	password: '',
	confirmPassword: '',
};

const ResetPasswordForm: React.FC<Props> = ({ email, otp }) => {
	const isMounted = useRef(true);
	const { navigate } = useNavigation();

	const [resetPassword, { data, loading, error }] =
		useResetPasswordActionMutation({
			fetchPolicy: 'network-only',
		});

	React.useEffect(() => {
		if (error) {
			Toast.show({
				type: 'error',
				text1: error.message!,
			});
		}
		if (data && !data?.resetPasswordAction?.status) {
			Toast.show({
				type: 'error',
				text1: data.resetPasswordAction?.message!,
			});
		}
		if (!loading && data?.resetPasswordAction?.status) {
			Toast.show({
				type: 'success',
				text1: data.resetPasswordAction?.message!,
			});
			navigate('LoginScreen');
			isMounted.current = false;
		}
	}, [data, loading, error]);

	return (
		<View testID='ResetPasswordForm'>
			<FormContainer
				initialValues={{
					password: '',
					confirmPassword: '',
				}}
				validationSchema={resetPasswordValidationSchema}
				onSubmit={async (values: IValues, { resetForm }: any) => {
					console.log(otp);

					try {
						resetPassword({
							variables: {
								email: email,
								otp: otp,
								password: values.password,
								confirmPassword: values.confirmPassword,
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
						label='Password'
						name='password'
						secureTextEntry
						textContentType='password'
					/>
					<Field
						component={FormField}
						label='Confirm Password'
						name='confirmPassword'
						secureTextEntry
						textContentType='password'
					/>
				</View>

				<SubmitButton title='Submit' />
			</FormContainer>
		</View>
	);
};

export default ResetPasswordForm;
