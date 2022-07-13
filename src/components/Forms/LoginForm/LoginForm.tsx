import React, { useRef } from 'react';
import { Field } from 'formik';
import FormField from 'src/components/Forms/Field';
import SubmitButton from 'src/components/Forms/SubmitButton';
import FormContainer from 'src/components/Forms//FormContainer';
import { loginValidationSchema } from 'src/utils/ValidationSchema';
import { View } from 'react-native';
import { useAuth } from 'src/context/authContext/authContext';
import { useSignInMutation } from 'src/generated/graphql';
import Toast from 'react-native-toast-message';

interface IValues {
	email: string;
	password: string;
}

const initialValuesObject: IValues = {
	email: '',
	password: '',
};

const LoginForm = () => {
	const isMounted = useRef(true);
	const { signIn: singInAuth, checkingAuth } = useAuth();

	const [signIn, { data, loading, error }] = useSignInMutation({
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
		if (data && !data?.signIn?.status) {
			Toast.show({
				type: 'error',
				text1: data.signIn?.message!,
			});
		}

		if (!loading && data?.signIn?.token) {
			Toast.show({
				type: 'success',
				text1: data.signIn?.message!,
			});
			singInAuth(data.signIn.token);
			isMounted.current = false;
		}
	}, [data, loading, error]);

	return (
		<View testID='login-form'>
			<FormContainer
				testID='login-form'
				initialValues={{
					userName: '',
					password: '',
				}}
				validationSchema={loginValidationSchema}
				onSubmit={async (values: IValues, { resetForm }: any) => {
					checkingAuth();
					try {
						signIn({
							variables: {
								email: values.email,
								password: values.password,
							},
						});
					} catch (err) {
						console.log(err);
					}
				}}
			>
				<Field
					component={FormField}
					name='email'
					label='E-mail'
					autoCompleteType='email'
					keyboardType='email-address'
					textContentType='emailAddress'
				/>

				<Field
					component={FormField}
					label='Password'
					name='password'
					secureTextEntry
					textContentType='password'
				/>

				<SubmitButton title='Submit' />
			</FormContainer>
		</View>
	);
};

export default LoginForm;
