import { StyleSheet } from 'react-native';
import { spacing } from 'src/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		height: spacing.hp(60),
		width: spacing.wp(100),

		marginBottom: 20,
	},
});
