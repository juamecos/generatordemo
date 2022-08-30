import { StyleSheet } from 'react-native';
import { color } from 'src/theme';
import { constants } from 'src/theme/constants';
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
		height: spacing.vertical.twoThirds,
		borderBottomEndRadius: constants.CARD_BORDER_RADIUS,
		borderBottomStartRadius: constants.CARD_BORDER_RADIUS,
		backgroundColor: color.palette.black,
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
	infoText: {
		paddingLeft: spacing.horizontal.tiny,
	},
	infoItem: {
		padding: spacing.horizontal.micro,
		marginHorizontal: spacing.horizontal.micro,
	},
	infoItemTitle: {
		color: color.primary,
	},
});
