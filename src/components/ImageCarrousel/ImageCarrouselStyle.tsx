import { StyleSheet } from 'react-native';
import { spacing } from '../../theme/spacing';

export default StyleSheet.create({
	container: {},
	title: { paddingLeft: spacing.horizontal.tiny },
	itemContent: {
		alignItems: 'center',
		width: spacing.horizontal.huge,
		margin: spacing.horizontal.tiny,
	},

	itemImage: {
		width: '100%',
		height: spacing.vertical.large,
		borderRadius: spacing.horizontal.tiny,
	},
});
