import { StyleSheet } from 'react-native';
import { color } from 'src/theme/color';
import { spacing } from 'src/theme/spacing';

export default StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: color.primary,
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: spacing.vertical.nano,
		paddingHorizontal: spacing.horizontal.small,
	},
	textBtn: {
		color: 'white',
		fontSize: spacing.horizontal.tiny,
		textTransform: 'uppercase',
	},
});
