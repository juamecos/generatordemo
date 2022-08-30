import { StyleSheet } from 'react-native';
import { color, spacing } from 'src/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.white,
		alignItems: 'center',
		paddingBottom: spacing.vertical.tiny,
	},
	slide: {
		width: spacing.wp(100),
		justifyContent: 'center',
	},
});
