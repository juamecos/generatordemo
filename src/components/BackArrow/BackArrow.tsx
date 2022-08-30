import React from 'react';
import { color } from 'src/theme';
import IconText from '../IconText';
import styles from './BackArrowStyle';
import { useNavigation } from '@react-navigation/native';

export type Props = {
	onPress?: any;
};

const BackArrow: React.FC<Props> = ({ onPress }) => {
	const { goBack } = useNavigation();
	return (
		<IconText
			bottom
			iconName='arrow-back-outline'
			onPress={!onPress ? () => goBack() : onPress}
			iconColor={color.palette.white}
			style={styles.container}
		/>
	);
};

export default BackArrow;
