import * as Yup from 'yup';

//TODO check validations for user name and code

const userName = Yup.string()
	.required('Username is required')
	.label('userName');
const email = Yup.string()
	.email('Please enter valid email')
	.required('Email is required')
	.label('Email');
const password = Yup.string()
	.matches(/\w*[a-z]\w*/, 'Password must have a small letter')
	.matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
	.matches(/\d/, 'Password must have a number')
	.min(8, ({ min }) => `Password must be at least ${min} characters`)
	.required('Password is required')
	.label('Password');
const confirmPassword = Yup.string()
	.oneOf([Yup.ref('password')], 'Passwords do not match')
	.required('Confirm password is required')
	.label('confirmPassword');

const code = Yup.string()
	.required('Code is required. Check behind the stone')
	.label('code');

const signUpValidationSchema = Yup.object().shape({
	userName,
	email,
	password,
	confirmPassword,
});

const loginValidationSchema = Yup.object().shape({ email, password });
const forgotValidationSchema = Yup.object().shape({ email });
const resetPasswordValidationSchema = Yup.object().shape({
	password,
	confirmPassword,
});
const codeValidationSchema = Yup.object().shape({ code });

export {
	signUpValidationSchema,
	loginValidationSchema,
	forgotValidationSchema,
	resetPasswordValidationSchema,
	codeValidationSchema,
};
