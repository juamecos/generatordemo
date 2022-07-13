import { StyleSheet } from 'react-native';
import { spacing } from 'src/theme/spacing';
import { color } from 'src/theme/color';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
		borderRadius: spacing.horizontal.micro,
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
	input: {
		flex: 1,
		paddingLeft: spacing.horizontal.tiny,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
	},
	sendButton: {
		width: spacing.horizontal.medium,
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
