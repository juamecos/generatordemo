import React from 'react';
import { color } from 'src/theme';
import styles from './CloseButtonStyle';
import IconText from 'src/components/IconText';

export type Props = {
	handleClose: (arg0: boolean) => void;
};

const CloseButton: React.FC<Props> = ({ handleClose }) => {
	return (
		<IconText
			bottom
			iconName='close-outline'
			onPress={() => {
				handleClose(false);
			}}
			iconColor={color.palette.white}
			style={styles.container}
		/>
	);
};

export default CloseButton;
