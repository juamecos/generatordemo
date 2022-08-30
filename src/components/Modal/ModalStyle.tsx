import { StyleSheet } from 'react-native';
import { spacing, color } from 'src/theme';

export default StyleSheet.create({
	modalContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.palette.offWhite,
	},
	fullScreenModal: {
		flex: 1,
	},
	topModal: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		borderBottomLeftRadius: spacing.horizontal.small,
		borderBottomRightRadius: spacing.horizontal.small,
		overflow: 'hidden',
	},
	modalContent: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingVertical: spacing.vertical.small,
		backgroundColor: color.palette.white,
	},

	close: {
		position: 'absolute',
		right: -spacing.horizontal.micro,
	},
	modalHeader: {
		flexDirection: 'row',
		paddingBottom: spacing.vertical.tiny,
	},
	modalFooter: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: spacing.vertical.tiny,
		width: '100%',
	},
});
