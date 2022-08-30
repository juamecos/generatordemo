import React, { FC, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import style from './LocationScreenStyle';
import { LocationScreenProps } from './LocationScreenProps';
import MapComponent from 'src/components/MapComponent';
import CustomButton from 'src/components/CustomButton';

import { useStone } from 'src/context/stoneContext/stoneContext';
import { spacing } from 'src/theme';
import BackArrow from 'src/components/BackArrow';
import ActionSheet from 'src/components/ActionSheet';

/**
 * Screen component description
 *
 * @returns Screen
 */
const LocationScreen: FC<LocationScreenProps> = ({ route, navigation }) => {
	// From the previous screen
	const initialParams = route?.params;

	// Context

	const { step, location, setStep } = useStone();

	// Custom hooks

	// Internal state

	// Component JSX
	return (
		<SafeAreaView style={style.container} testID='LocationScreen'>
			<MapComponent />
		</SafeAreaView>
	);
};

export default LocationScreen;
