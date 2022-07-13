import { StyleSheet } from 'react-native';
import { color, spacing } from 'src/theme';

export default StyleSheet.create({
	container: {
		paddingHorizontal: spacing.horizontal.tiny,
	},
	infoSection: {
		minHeight: 200,
		paddingVertical: spacing.vertical.tiny,
		justifyContent: 'center',
		alignItems: 'center',
	},
	userAvatarSection: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: spacing.vertical.tiny,
	},
	userInfoSecction: {
		// backgroundColor: 'red',
		justifyContent: 'center',
		alignSelf: 'flex-start',
	},
	infoBoxWrapper: {
		borderBottomColor: color.palette.lighterGrey,
		borderBottomWidth: 1,
		borderTopColor: color.palette.lighterGrey,
		borderTopWidth: 1,
		flexDirection: 'row',
		height: spacing.vertical.medium,
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
