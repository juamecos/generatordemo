/**
 * @format
 */

import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import Notifications from './Notifications';

const createTestProps = (props: object) => ({
	...props,
});

describe('<Notifications />', () => {
	const props = createTestProps({});
	const { getByTestId } = render(<Notifications {...props} />);

	test('renders correctly', () => {
		const element = getByTestId('Notifications');
		expect(element).toBeTruthy();
	});
});
