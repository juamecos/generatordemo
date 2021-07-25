import React from 'react';
import { Field } from 'formik';
import FormField from 'src/components/Forms/Field';
import SubmitButton from 'src/components/Forms/SubmitButton';
import FormContainer from 'src/components/Forms//FormContainer';
import { signUpValidationSchema } from 'src/utils/ValidationSchema';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpForm = () => {
	const navigation = useNavigation();
	return (
		<View testID='sign-up-form'>
			<FormContainer
				initialValues={{
					userName: '',
					email: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={signUpValidationSchema}
				onSubmit={(values: any) => {
					console.log(values);
					navigation.navigate('LoginScreen');
				}}
			>
				<Field
					component={FormField}
					name='userName'
					label='Username'
					placeholder='Username'
				/>
				<Field
					component={FormField}
					name='email'
					label='Email'
					placeholder='Email'
					autoCompleteType='email'
					keyboardType='email-address'
					textContentType='emailAddress'
				/>
				<Field
					component={FormField}
					name='password'
					label='Password'
					placeholder='Password'
					secureTextEntry
					textContentType='password'
				/>
				<Field
					component={FormField}
					name='confirmPassword'
					label='Confirm Password'
					placeholder='Confirm Password'
					secureTextEntry
					textContentType='password'
				/>
				<SubmitButton title='Submit' />
			</FormContainer>
		</View>
	);
};

export default SignUpForm;
