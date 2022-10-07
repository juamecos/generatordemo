/**
 * @format
 */

import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import FoundStoneScreen from './FoundStoneCodeScreen';
import { FoundStoneScreenProps } from './FoundStoneCodeScreenProps';

const createTestProps = (props: object) => ({
	...props,
});

describe('<FoundStoneScreen />', () => {
	const props = createTestProps({});
	const { getByTestId } = render(<FoundStoneScreen {...props} />);

	test('renders correctly', () => {
		const element = getByTestId('FoundStoneScreen');
		expect(element).toBeTruthy();
	});
});
