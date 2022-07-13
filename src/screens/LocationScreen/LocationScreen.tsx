import React, { FC, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import style from './LocationScreenStyle';
import { LocationScreenProps } from './LocationScreenProps';
import MapComponent from 'src/components/MapComponent';
import CustomButton from 'src/components/CustomButton';

import { useStone } from 'src/context/stoneContext/stoneContext';
import { spacing } from 'src/theme';
import BackArrow from 'src/components/BackArrow';

/**
 * Screen component description
 *
 * @returns Screen
 */
const LocationScreen: FC<LocationScreenProps> = ({ route, navigation }) => {
	// From the previous screen
	const initialParams = route?.params;

	// Context

	const { step, location, setStep, setLocation } = useStone();

	// Custom hooks
	console.log(location);

	// Internal state

	// Component JSX
	return (
		<SafeAreaView
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
			testID='LocationScreen'
		>
			<MapComponent />

			<CustomButton
				medium
				rounded
				disabled={
					location.latitude === 0 && location.longitude === 0 ? true : false
				}
				title='Next'
				styleBtn={{
					width: '30%',
					position: 'absolute',
					bottom: spacing.hp(20),
					right: spacing.wp(50),
					transform: [{ translateX: 50 }],
				}}
				onPress={async () => {
					setStep(step + 1);
					navigation?.navigate('DescriptionScreen');
				}}
			/>
		</SafeAreaView>
	);
};

export default LocationScreen;
