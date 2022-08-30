import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './OTPInputFieldStyle';

export type Props = {
	setPinReady: React.Dispatch<React.SetStateAction<boolean>>;
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
	maxLength: number;
};

const OTPInputField = ({ code, maxLength, setCode, setPinReady }: Props) => {
	const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);
	const codeDigitsArray = new Array(maxLength).fill(0);

	// ref for the text input
	const textInputRef = useRef<TextInput>();

	const handleOnBlur = () => {
		setInputContainerIsFocused(false);
	};

	const handleOnPress = () => {
		setInputContainerIsFocused(true);
		textInputRef?.current?.focus();
	};

	useEffect(() => {
		setPinReady(code.length === maxLength);

		return () => {
			setPinReady(false);
		};
	}, [code]);

	const toCodeDigitInput = (_value, index) => {
		const emptyInputChar = ' ';
		const digit = code[index] || emptyInputChar;
		const isCurrentDigit = index === code.length;
		const isLastDigit = index === maxLength - 1;
		const isCodeFull = code.length === maxLength;

		const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);
		return (
			<View
				style={[
					styles.OTPInput,
					inputContainerIsFocused && isDigitFocused && styles.OTPInputFocused,
				]}
				key={index}
			>
				<Text style={styles.OTPInputText}>{digit}</Text>
			</View>
		);
	};
	return (
		<View style={styles.OTPInputSection}>
			<Pressable style={styles.OTPInputContainer} onPress={handleOnPress}>
				{codeDigitsArray.map(toCodeDigitInput)}
			</Pressable>
			<TextInput
				ref={textInputRef}
				style={styles.hiddenTextInput}
				value={code}
				maxLength={maxLength}
				onChangeText={setCode}
				onBlur={handleOnBlur}
				returnKeyType='done'
				keyboardType='number-pad'
				textContentType='oneTimeCode'
			/>
		</View>
	);
};

export default OTPInputField;
