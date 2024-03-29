import { StyleSheet } from 'react-native';
import { spacing } from '../../theme/spacing';
import { color } from '../../theme/color';
import { constants } from 'src/theme/constants';

export default StyleSheet.create({
	card: {
		backgroundColor: color.palette.white,
		height: constants.CARD_HEIGHT,
		width: constants.CARD_WIDTH,
		marginVertical: constants.CARD_VERTICAL_MARGIN,
		borderRadius: constants.CARD_BORDER_RADIUS,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 9,

		elevation: 3,
	},
	container: { flex: 1 },
	space: { flex: 2 },
	header: {
		flexDirection: 'row',
		height: '22.5%',
		width: '100%',
		paddingVertical: spacing.vertical.micro,
		paddingHorizontal: spacing.vertical.micro,
	},
	headerRight: {
		height: '100%',
		flex: 2,
		flexDirection: 'row',
	},
	avatar: {
		borderRadius: 99999,
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: spacing.vertical.micro,
	},
	info: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	userName: {},
	published: {},
	headerLeft: { height: '100%', width: spacing.horizontal.medium },
	menu: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	body: { flex: 1 },
	image: { width: '100%', height: '100%' },
	footer: {
		flexDirection: 'row',
		height: '16.5%',
		width: '100%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		paddingHorizontal: spacing.vertical.micro,
	},
	footerLeft: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: spacing.vertical.nano,
	},
	textIconStyle: { paddingLeft: spacing.wp('3%') },
	views: {},
	footerRight: {
		width: '55%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: spacing.vertical.nano,
	},
	likes: {},
	comments: {},
});
