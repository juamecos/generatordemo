import { StyleSheet } from 'react-native';
import { color, spacing } from 'src/theme';

const buttonSize = spacing.horizontal.tiny * 4;
const buttonBorderRadius = spacing.horizontal.tiny;

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		paddingVertical: spacing.vertical.medium,
	},
	cameraBtn: {
		height: buttonSize,
		width: buttonSize,
		borderRadius: buttonBorderRadius,
		backgroundColor: color.palette.purple,
	},
	galeryBtn: {
		height: buttonSize,
		width: buttonSize,
		borderRadius: buttonBorderRadius,
		backgroundColor: color.secondary,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
