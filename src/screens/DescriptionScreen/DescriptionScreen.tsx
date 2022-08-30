import React, { FC, useEffect } from 'react';
import { SafeAreaView, Text, KeyboardAvoidingView } from 'react-native';
import style from './DescriptionScreenStyle';
import { DescriptionScreenProps } from './DescriptionScreenProps';
import { useStone } from 'src/context/stoneContext/stoneContext';
import BackArrow from 'src/components/BackArrow';
import AddStoneForm from 'src/components/Forms/AddStoneForm';
import FormContainer from 'src/components/Forms/FormContainer';
import { color, spacing } from 'src/theme';

/**
 * Screen component description
 *
 * @returns Screen
 */
const DescriptionScreen: FC<DescriptionScreenProps> = ({
	route,
	navigation,
}) => {
	// From the previous screen
	const initialParams = route?.params;

	// Context
	const { info, setInfo, location } = useStone();
	// Custom hooks

	// Internal state

	useEffect(() => {}, []);

	// Component JSX
	return (
		<KeyboardAvoidingView
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom: spacing.vertical.tiny,
				backgroundColor: color.primaryLighter,
			}}
			testID='DescriptionScreen'
		>
			<AddStoneForm />

			<BackArrow />
		</KeyboardAvoidingView>
	);
};

export default DescriptionScreen;
