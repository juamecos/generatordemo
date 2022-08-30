import { StyleSheet } from 'react-native';
import { color, spacing } from 'src/theme';

export default StyleSheet.create({
	container: {
		backgroundColor: color.primary,
		borderBottomEndRadius: spacing.horizontal.small,
		borderBottomStartRadius: spacing.horizontal.small,
		marginBottom: spacing.vertical.nano,
	},
	infoSection: {
		minHeight: 200,
		paddingVertical: spacing.vertical.small,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.palette.white,
		borderBottomEndRadius: spacing.horizontal.small,
		borderBottomStartRadius: spacing.horizontal.small,
	},
	userAvatarSection: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	userName: {
		paddingTop: spacing.vertical.tiny,
	},

	infoBoxWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: spacing.vertical.medium,
		paddingHorizontal: spacing.horizontal.tiny,
		borderBottomEndRadius: spacing.horizontal.small,
		borderBottomStartRadius: spacing.horizontal.small,
		backgroundColor: color.primary,
	},

	infoBox: {
		width: spacing.wp(29),
		alignItems: 'center',
		justifyContent: 'center',
	},
	wrapper: {
		backgroundColor: 'white',
		paddingTop: spacing.horizontal.tiny,
	},
});
