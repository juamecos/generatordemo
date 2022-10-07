import React, { FC, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import style from './FoundStoneMapScreenStyle';
import { FoundStoneMapScreenProps } from './FoundStoneMapScreenProps';

import MapComponent from 'src/components/MapComponent';
import { useFound } from '../../context/foundContext/foundContext';

/**
 * Screen component description
 *
 * @returns Screen
 */
const FoundStoneMapScreen: FC<FoundStoneMapScreenProps> = ({
	route,
	navigation,
}) => {
	const { routeName } = route;

	// Context

	// Custom hooks

	// Internal state

	useEffect(() => {}, []);

	// Component JSX
	return (
		<SafeAreaView style={style.container} testID='FoundStoneMapScreen'>
			<MapComponent routeName='FoundStoneMapScreen' />
		</SafeAreaView>
	);
};

export default FoundStoneMapScreen;
