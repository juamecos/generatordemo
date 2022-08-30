import React from 'react';
import { Button, View, ViewStyle } from 'react-native';
import { useFormikContext } from 'formik';
import styles from 'src/components/Forms/SubmitButton/SubmitButtonStyle';
import { color } from 'src/theme';

interface SubmitButtonProps {
	title: string;
	styleButton?: ViewStyle;
	buttonColor?: string;
}

const SubmitButton = ({
	title,
	styleButton,
	buttonColor = color.primary,
}: SubmitButtonProps) => {
	const { handleSubmit, isValid } = useFormikContext();
	return (
		<View
			testID='submit-button'
			style={{ ...styles.submitBtn, ...styleButton }}
		>
			<Button
				onPress={handleSubmit}
				title={title}
				disabled={!isValid}
				color={buttonColor}
			/>
		</View>
	);
};

export default SubmitButton;
