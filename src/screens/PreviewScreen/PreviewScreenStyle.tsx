import { StyleSheet } from 'react-native';
import { color } from 'src/theme';
import { spacing } from '../../theme/spacing';

export default StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		backgroundColor: color.palette.offWhite,
	},
	imageWrapper: {
		width: spacing.wp(100),
		height: spacing.vertical.huge,
		borderBottomEndRadius: spacing.vertical.nano,
		borderBottomStartRadius: spacing.vertical.nano,
		overflow: 'hidden',
	},
	image: {
		flex: 1,
		backgroundColor: color.modalBg,
	},
	wrapperInfo: {
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
});
