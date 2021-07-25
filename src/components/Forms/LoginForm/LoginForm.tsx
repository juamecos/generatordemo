import React from 'react';
import { Field } from 'formik';
import FormField from 'src/components/Forms/Field';
import SubmitButton from 'src/components/Forms/SubmitButton';
import FormContainer from 'src/components/Forms//FormContainer';
import { loginValidationSchema } from 'src/utils/ValidationSchema';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {
	const navigation = useNavigation();
	return (
		<View testID='login-form'>
			<FormContainer
				testID='login-form'
				initialValues={{
					userName: '',
					password: '',
				}}
				validationSchema={loginValidationSchema}
				onSubmit={(values: any) => {
					console.log(values);
					navigation.navigate('HomeScreen');
				}}
			>
				<Field
					testID='userName'
					component={FormField}
					label='Username'
					name='userName'
					placeholder='Username'
					autofocus
				/>

				<Field
					component={FormField}
					label='Password'
					name='password'
					placeholder='Password'
					secureTextEntry
					textContentType='password'
				/>

				<SubmitButton title='Submit' />
			</FormContainer>
		</View>
	);
};

export default LoginForm;
