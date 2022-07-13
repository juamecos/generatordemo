import { StyleSheet } from 'react-native';
import { color, spacing } from 'src/theme';

export default StyleSheet.create({
	card: {
		flexDirection: 'row',
		marginVertical: spacing.vertical.nano,
		backgroundColor: color.palette.white,
		borderRadius: spacing.horizontal.micro,
	},
	commentRight: {
		height: '100%',
		flexDirection: 'row',
	},
	avatar: {
		borderRadius: 99999,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingLeft: spacing.vertical.micro,
	},
	commentLeft: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		backgroundColor: color.palette.greenLighter,
		borderRadius: spacing.horizontal.tiny,
		borderBottomLeftRadius: 0,
		borderTopRightRadius: 0,
		paddingHorizontal: spacing.horizontal.tiny,
		paddingVertical: spacing.vertical.nano,
	},
	userName: {},
	comment: { paddingVertical: spacing.vertical.pico },
	published: {},
});
