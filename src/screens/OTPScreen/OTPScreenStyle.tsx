import { StyleSheet } from 'react-native';
import { spacing } from 'src/theme';

export default StyleSheet.create({
	title: {
		marginBottom: spacing.vertical.tiny,
	},
	screenWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonWrapper: {
		paddingTop: spacing.vertical.small,
		marginHorizontal: spacing.horizontal.large,
	},
});
