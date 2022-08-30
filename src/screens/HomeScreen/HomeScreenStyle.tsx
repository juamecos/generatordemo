import { StyleSheet } from 'react-native';
import { color } from 'src/theme';
import { spacing } from '../../theme/spacing';

export default StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.primaryLighter,
	},
	feedContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	listHeader: {
		backgroundColor: color.palette.white,
		minHeight: spacing.vertical.small,
		width: spacing.wp(95),
		marginVertical: spacing.vertical.micro,
		paddingVertical: spacing.vertical.micro,
		paddingHorizontal: spacing.vertical.micro,
		borderRadius: spacing.horizontal.micro,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		overflow: 'hidden',
		elevation: 3,
	},
	listHeaderFilters: {
		backgroundColor: color.palette.white,
		minHeight: spacing.vertical.small,
		width: spacing.wp(95),
		marginVertical: spacing.vertical.nano,
		paddingVertical: spacing.vertical.nano,
		borderRadius: spacing.horizontal.micro,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		overflow: 'hidden',
		elevation: 3,
	},
	upArrow: {
		position: 'absolute',
		bottom: spacing.hp('11.8%'),
		right: spacing.hp('2.8%'),
		backgroundColor: color.primaryDarker,
		width: spacing.hp('5%'),
		height: spacing.hp('5%'),
		borderRadius: 10000,
		opacity: 0.8,
	},
});
