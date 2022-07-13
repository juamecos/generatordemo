import { StyleSheet } from 'react-native';
import { color, spacing } from 'src/theme';

export default StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		height: spacing.wp(25),
		width: spacing.wp(25),
		borderColor: color.primary,
		borderRadius: 100,
		borderWidth: 2,
		marginVertical: spacing.vertical.nano,
		overflow: 'hidden',
	},
	image: {
		height: spacing.wp(24),
		width: spacing.wp(24),
	},
});
