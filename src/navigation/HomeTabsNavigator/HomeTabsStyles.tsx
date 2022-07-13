import { StyleSheet } from 'react-native';
import { color, spacing } from 'src/theme';

export default {
	tabBar: {
		position: 'absolute',
		bottom: spacing.vertical.micro,
		left: spacing.horizontal.micro,
		right: spacing.horizontal.micro,
		backgroundColor: color.palette.white,
		borderRadius: spacing.vertical.micro,
		height: spacing.vertical.small,
	},
	tabBarItem: {},
	addButton: {},
};
