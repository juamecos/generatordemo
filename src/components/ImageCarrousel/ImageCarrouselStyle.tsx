import { StyleSheet } from 'react-native';
import { shadow } from 'src/theme/shadow';
import { spacing } from '../../theme/spacing';

export default StyleSheet.create({
	container: { paddingLeft: spacing.horizontal.tiny },

	itemContent: {
		alignItems: 'center',
		width: spacing.horizontal.huge,
		marginVertical: spacing.horizontal.small,
		marginRight: spacing.horizontal.tiny,
		...shadow.light,
	},

	itemImage: {
		width: '100%',
		height: spacing.vertical.large,
		borderRadius: spacing.horizontal.tiny,
	},
});
