import { StyleSheet } from 'react-native';
import { color, spacing } from 'src/theme';

export default StyleSheet.create({
	inputBox: {
		marginVertical: spacing.vertical.nano,
	},
	inputComponent: {
		minHeight: 50,
		borderBottomColor: color.primary,
		borderBottomWidth: 1,
		borderLeftColor: color.primary,
		borderLeftWidth: 1,
		paddingVertical: 0,
		marginVertical: 0,
		borderBottomLeftRadius: spacing.horizontal.tiny,
	},
	errorMessage: {
		marginTop: spacing.vertical.nano,
		color: color.error,
	},
});
