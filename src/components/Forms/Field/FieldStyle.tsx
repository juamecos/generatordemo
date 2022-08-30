import { StyleSheet } from 'react-native';
import { color, spacing } from 'src/theme';

export default StyleSheet.create({
	inputBox: {
		borderBottomColor: color.primary,
		borderBottomWidth: 1,
		minHeight: 50,
		marginVertical: spacing.vertical.nano,
	},
	inputComponent: {
		paddingVertical: 0,
		marginVertical: 0,
	},
	errorMessage: {
		marginTop: spacing.vertical.nano,
		color: color.error,
	},
});
