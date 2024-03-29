/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color, palette, spacing } from 'src/theme';

import { Props } from './CustomButtonProps';
import styles from './CustomButtonStyle';

/**
 *
 *
 * @param {Props} {
 * 	title,
 * 	styleBtn,
 * 	styleText,
 * 	iconName,
 * 	disabled,
 * 	right,
 * 	iconSize,
 * 	iconColor,
 * 	textButton,
 * 	textColor,
 * 	primary,
 * 	secondary,
 * 	danger,
 * 	rounded,
 * 	bordered,
 * 	small,
 * 	medium,
 * 	large,
 * 	onPress,
 * }
 * @return {*}
 */
const CustomButton: React.FC<Props> = ({
	title,
	styleBtn,
	styleText,
	disabled,
	active,
	right,
	iconName,
	iconSize,
	iconColor,
	textButton,
	textColor,
	primary,
	secondary,
	danger,
	rounded,
	bordered = false,
	mini,
	small,
	medium,
	large,
	onPress,
}: Props): any => {
	const iconTextColor = () => {
		if (!bordered) return color.textWhite;
		if (primary && bordered) return color.primary;
		if (secondary && bordered) return color.secondary;
		if (disabled && textButton) return color.palette.green;
	};
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={onPress}
			disabled={disabled}
			style={[
				styles.container,
				textButton && { borderWidth: 0, backgroundColor: color.transparent },
				primary && {
					borderColor: color.primary,
					backgroundColor: color.primary,
				},
				secondary && {
					borderColor: color.palette.orange,
					backgroundColor: color.palette.orange,
				},
				danger && {
					borderColor: color.palette.red,
					backgroundColor: color.palette.red,
				},
				rounded && { borderRadius: 1000 },
				disabled && { backgroundColor: palette.lightGrey },
				disabled && textButton && { backgroundColor: color.transparent },
				right && {
					flexDirection: 'row-reverse',
				},
				bordered ? { borderWidth: 1 } : { borderWidth: 0 },
				primary && bordered && { backgroundColor: palette.white },
				secondary && bordered && { backgroundColor: palette.white },
				danger && bordered && { backgroundColor: palette.white },
				mini && {
					paddingHorizontal: 0.5 * spacing.horizontal.tiny,
					paddingVertical: 0.5 * spacing.vertical.nano,
				},
				small && { paddingVertical: 0.5 * spacing.vertical.nano },
				medium && { paddingVertical: spacing.vertical.nano },
				large && { paddingVertical: 1.25 * spacing.vertical.nano },
				styleBtn,
			]}
			testID='custom-button'
		>
			{iconName && (
				<Icon
					name={iconName}
					size={iconSize}
					color={iconColor ? iconColor : iconTextColor()}
				/>
			)}
			<Text
				style={[
					{ color: iconTextColor() },
					textButton && { color: color.primary },
					textButton &&
						active && {
							color: color.primary,
							fontWeight: 'bold',
							textDecorationLine: 'underline',
							textDecorationStyle: 'double',
						},
					textColor && { color: textColor },
					styleText,
				]}
			>
				{' '}
				{title}{' '}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
