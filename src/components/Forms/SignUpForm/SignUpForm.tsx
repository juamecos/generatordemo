import React, { useRef, useState } from 'react';
import { Field } from 'formik';
import FormField from 'src/components/Forms/Field';
import SubmitButton from 'src/components/Forms/SubmitButton';
import FormContainer from 'src/components/Forms//FormContainer';
import { signUpValidationSchema } from 'src/utils/ValidationSchema';
import { View } from 'react-native';

import {
	NavigationHelpersContext,
	useNavigation,
} from '@react-navigation/native';
// import { useToast } from 'react-native-toast-notifications';
import { useSignUpMutation } from 'src/generated/graphql';
import Text from 'src/components/Text';
import Loader from 'src/components/Loader';
import Toast from 'react-native-toast-message';
import { GraphQLError } from 'graphql';
import { useAuth } from '../../../context/authContext/authContext';

interface IValues {
	userName: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

const SignUpForm = () => {
	const { navigate } = useNavigation();
	const isMounted = useRef(true);
	const { status } = useAuth();

	const [signUp, { data, loading, error }] = useSignUpMutation();

	React.useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	React.useEffect(() => {
		const timer = () => {
			setTimeout(() => navigate('LoginScreen'), 500);
		};
		if (error) {
			Toast.show({
				type: 'error',
				text1: error.message!,
			});
		}

		if (data?.signUp?.user === null) {
			Toast.show({
				type: 'error',
				text1: data.signUp?.message!,
			});
		}

		if (!loading && data?.signUp?.user) {
			Toast.show({
				type: 'success',
				text1: data.signUp?.message!,
			});
			isMounted.current = false;
			timer();
		}
	}, [data, loading, error]);

	return (
		<>
			{status === 'Checking' || loading ? (
				<Loader />
			) : (
				<View testID='sign-up-form'>
					<FormContainer
						initialValues={{
							userName: '',
							email: '',
							password: '',
							confirmPassword: '',
						}}
						validationSchema={signUpValidationSchema}
						onSubmit={async (values: IValues, { resetForm: any }) => {
							try {
								await signUp({
									variables: {
										user: {
											userName: values.userName,
											email: values.email,
											password: values.password,
										},
									},
								});
							} catch (err: any) {
								Toast.show({
									type: 'error',
									text1: err.message!,
								});
							}
						}}
					>
						<Field
							component={FormField}
							name='userName'
							label='Username'
							autofocus
						/>
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
							name='password'
							label='Password'
							secureTextEntry
							textContentType='password'
						/>
						<Field
							component={FormField}
							name='confirmPassword'
							label='Confirm Password'
							secureTextEntry
							textContentType='password'
						/>

						<SubmitButton title='Submit' />
					</FormContainer>
				</View>
			)}
		</>
	);
};

export default SignUpForm;
