import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

export default StyleSheet.create({
	map: {
		height: '100%',
	},
	buttonGroup: {
		position: 'absolute',
		right: 0,
		left: 0,
		bottom: 0,
		height: '10%',
		flexDirection: 'row',
		backgroundColor: color.palette.offWhite,
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
});
