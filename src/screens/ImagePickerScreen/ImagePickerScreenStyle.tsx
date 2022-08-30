import { StyleSheet } from 'react-native';
import { color, spacing } from 'src/theme';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.primaryLighter,
	},
	title: { color: color.palette.white },
	wrapperBtn: {
		position: 'absolute',
		width: '100%',
		bottom: spacing.hp(0),
		paddingHorizontal: spacing.horizontal.medium,
		paddingVertical: spacing.vertical.tiny,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	nextBtn: {
		marginLeft: spacing.horizontal.tiny,
	},
	dismissBtn: {},
	imageBase64: {
		height: spacing.hp(100),
		width: spacing.wp(100),
	},
	illustrationContainer: {
		height: spacing.horizontal.mega,
		width: spacing.horizontal.mega,
		borderRadius: spacing.horizontal.small,
		backgroundColor: color.palette.offWhite,
		justifyContent: 'center',
		marginTop: spacing.vertical.medium,
		alignSelf: 'center',
	},
	illustration: {
		height: spacing.horizontal.half,
		width: spacing.horizontal.half * 1.2,
		borderRadius: spacing.horizontal.tiny,
		alignSelf: 'center',
	},
});
