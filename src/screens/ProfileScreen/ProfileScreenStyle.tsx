import { StyleSheet } from 'react-native';
import { color, spacing } from 'src/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.primary,
	},

	titleBox: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: spacing.vertical.tiny,
	},

	editProfile: {
		position: 'absolute',
		top: spacing.hp('2.8%'),
		right: spacing.hp('2.8%'),
		backgroundColor: color.palette.white,
		width: spacing.hp('5%'),
		height: spacing.hp('5%'),
		borderRadius: 10000,
	},

	userInfoSection: {
		flex: 1,
		minHeight: 200,
		paddingVertical: spacing.vertical.small,
		backgroundColor: color.palette.white,
		width: spacing.wp(75),
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomRightRadius: spacing.horizontal.small,
	},
	userAvatarSection: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
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

	menuWrapper: {
		flex: 1,
		backgroundColor: color.palette.offWhite,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: spacing.horizontal.tiny,
		marginHorizontal: spacing.horizontal.tiny,
		borderBottomEndRadius: spacing.horizontal.small,
		borderBottomStartRadius: spacing.horizontal.small,
		borderTopEndRadius: spacing.horizontal.small,
		borderTopStartRadius: spacing.horizontal.small,
		overflow: 'hidden',
	},
	menuContent: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},

	menuItem: {
		width: '28%',
		paddingVertical: spacing.wp(4),
		margin: 5,
		backgroundColor: color.palette.white,
		borderBottomEndRadius: spacing.horizontal.tiny,
		borderBottomStartRadius: spacing.horizontal.tiny,
		borderTopEndRadius: spacing.horizontal.tiny,
		borderTopStartRadius: spacing.horizontal.tiny,
	},
	menuItemText: { paddingTop: spacing.vertical.nano },
});
