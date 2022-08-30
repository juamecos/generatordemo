import { StyleSheet } from 'react-native';
import { color } from 'src/theme';
import { spacing } from '../../theme/spacing';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.palette.offWhite,
	},
	imageWrapper: {
		flex: 6,
		width: spacing.wp(100),
		height: spacing.vertical.twoThirds,
		borderBottomEndRadius: spacing.vertical.small,
		borderBottomStartRadius: spacing.vertical.small,
		overflow: 'hidden',
	},
	image: {
		flex: 1,
		backgroundColor: color.modalBg,
	},
	infoWrapper: {
		flex: 2,
		paddingHorizontal: spacing.horizontal.tiny,
	},
	info: {
		flexDirection: 'row',
		marginBottom: spacing.vertical.micro,
	},
	infoLeft: {
		paddingRight: spacing.horizontal.tiny,
		width: spacing.horizontal.large,
	},
	avatar: {
		marginTop: -spacing.vertical.tiny,
	},
	infoRight: {
		paddingTop: spacing.vertical.micro,
		flex: 2,
	},
	userName: {
		paddingBottom: spacing.vertical.micro,
		paddingLeft: spacing.horizontal.nano,
	},
	stoneTitle: {},
	infoItem: {
		padding: spacing.horizontal.micro,
		marginHorizontal: spacing.horizontal.micro,
	},
	infoItemTitle: {
		color: color.primary,
	},
	buttonWrapper: {
		flex: 1,
		justifyContent: 'center',

		alignItems: 'center',
	},
});
