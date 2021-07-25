import 'react-native';
import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

import LoginForm from './LoginForm';

const createTestProps = (props: object) => ({
	...props,
});

describe('<LoginForm />', () => {
	const props = createTestProps({});
	const { getByTestId } = render(<LoginForm {...props} />);

	test('renders correctly', () => {
		getByTestId('login-form');
	});

	test('renders error messages when username is not provided', async () => {
		const { getByPlaceholderText, queryAllByText } = render(
			<LoginForm {...props} />
		);

		const usernameInput = getByPlaceholderText('Username');

		await waitFor(() => {
			fireEvent.changeText(usernameInput, '');
		});

		await waitFor(() => {
			fireEvent(usernameInput, 'blur');
		});
		await waitFor(() => {
			expect(queryAllByText('Username is required')).toHaveLength(1);
		});
	});

	test('renders error messages when password is invalid', async () => {
		const { getByPlaceholderText, queryAllByText } = render(
			<LoginForm {...props} />
		);

		const passwordInput = getByPlaceholderText('Password');

		await waitFor(() => {
			fireEvent.changeText(passwordInput, '');
		});

		await waitFor(() => {
			fireEvent(passwordInput, 'blur');
		});

		await waitFor(() => {
			expect(queryAllByText('Password is required')).toHaveLength(1);
		});
	});

	test('does not show error messages when input values are valid', async () => {
		const { getByPlaceholderText, getByText, queryAllByText } = render(
			<LoginForm {...props} />
		);
		const usernameInput = getByPlaceholderText('Username');
		const passwordInput = getByPlaceholderText('Password');
		const loginButton = getByText('Submit');

		await waitFor(() => {
			fireEvent.changeText(usernameInput, 'testUser');
		});

		await waitFor(() => {
			fireEvent.changeText(passwordInput, '123456aA');
		});

		await waitFor(() => {
			fireEvent(passwordInput, 'blur');
		});

		fireEvent.press(loginButton);

		await waitFor(() => {
			expect(queryAllByText('Username is required')).toHaveLength(0);
			expect(queryAllByText('Password is required')).toHaveLength(0);
			expect(queryAllByText('Password must have a small letter')).toHaveLength(
				0
			);
			expect(
				queryAllByText('Password must have a capital letter')
			).toHaveLength(0);
		});
	});
});
