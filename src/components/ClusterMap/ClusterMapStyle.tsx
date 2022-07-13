import { StyleSheet } from 'react-native';
import { spacing } from 'src/theme';

export default StyleSheet.create({
	clusterMapWrapper: {
		flex: 1,
	},
	map: {
		height: spacing.hp(100),
		width: spacing.wp(100),

		marginBottom: 20,
	},
});
