import { StyleSheet } from 'react-native';
import { spacing, color } from '../../theme';

export default StyleSheet.create({
	container: {
		position: 'absolute',
		top: spacing.hp('2.8%'),
		left: spacing.hp('2.8%'),
		backgroundColor: color.palette.black,
		width: spacing.hp('5%'),
		height: spacing.hp('5%'),
		borderRadius: 10000,
		opacity: 0.8,
	},
});
