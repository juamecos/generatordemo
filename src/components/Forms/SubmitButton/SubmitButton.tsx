import React from 'react';
import { Button, View, ViewStyle } from 'react-native';
import { useFormikContext } from 'formik';
import styles from 'src/components/Forms/SubmitButton/SubmitButtonStyle';

interface SubmitButtonProps {
	title: string;
	styleButton?: ViewStyle;
}

const SubmitButton = ({ title, styleButton }: SubmitButtonProps) => {
	const { handleSubmit, isValid } = useFormikContext();
	return (
		<View
			testID='submit-button'
			style={{ ...styles.submitBtn, ...styleButton }}
		>
			<Button onPress={handleSubmit} title={title} disabled={!isValid} />
		</View>
	);
};

export default SubmitButton;
