import { StyleSheet } from 'react-native';

import { spacing } from 'src/theme';
import { color } from 'src/theme/color';

export default StyleSheet.create({
	image: {
		height: spacing.vertical.huge,
		width: spacing.wp(100),

		overflow: 'hidden',
	},
	commentCounter: {
		paddingLeft: spacing.horizontal.tiny,
	},
});
