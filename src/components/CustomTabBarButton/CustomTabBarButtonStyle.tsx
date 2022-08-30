import { StyleSheet } from 'react-native';
import { color } from 'src/theme';
import { shadow } from 'src/theme/shadow';
import { spacing } from '../../theme/spacing';

const buttonDiameter = spacing.vertical.small - spacing.vertical.nano;

export default StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		...shadow.dark,
	},
	wrapper: {
		width: buttonDiameter,
		height: buttonDiameter,
		borderRadius: 9999,
		backgroundColor: color.primaryDarker,

		elevation: 5,
	},
});
