import { StyleSheet } from 'react-native';
import { color } from 'src/theme';
import { constants } from 'src/theme/constants';

export default StyleSheet.create({
	OTPInputSection: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 30,
	},
	OTPInputContainer: {
		width: '70%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	OTPInput: {
		borderColor: color.secondary,
		minWidth: '12%',
		borderWidth: 2,
		borderRadius: constants.CARD_BORDER_RADIUS,
	},
	OTPInputFocused: {
		borderColor: color.secondaryDarker,
		backgroundColor: color.secondary,
	},
	OTPInputText: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
		color: color.primaryDarker,
	},
	hiddenTextInput: {
		position: 'absolute',
		width: 1,
		height: 1,
		opacity: 0,
	},
});
