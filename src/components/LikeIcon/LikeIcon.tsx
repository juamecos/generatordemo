import React from 'react';
import { View } from 'react-native';

import { color } from 'src/theme';
import IconText from '../IconText';
import styles from './LikeIconStyle';
import { IStone } from 'src/interfaces/IStone';
import { useLikes } from 'src/hooks/useLikes';
import { useUser } from 'src/context/userContext.tsx/userContext';

export type Props = {
	data: IStone;
};

const LikeIcon: React.FC<Props> = ({ data }) => {
	const { countLikes, isLike, onActionLike } = useLikes(data);

	return (
		<View testID='LikeIcon' style={styles.likes}>
			<IconText
				h5
				badge={countLikes ? true : false}
				badgeData={countLikes ? countLikes : null}
				iconName={isLike ? 'heart' : 'heart-outline'}
				iconColor={isLike ? color.palette.red : color.text}
				title='likes'
				textStyle={styles.textIconStyle}
				onPress={() => onActionLike()}
			/>
		</View>
	);
};

export default LikeIcon;
