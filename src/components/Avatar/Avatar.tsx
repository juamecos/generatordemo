import React from 'react';
import { Image } from 'react-native';
import { spacing } from 'src/theme';
// import { shadow } from '../../theme/shadow';

export type Props = {
	avatar?: string;
	size?: number;
};

/**
 * Element that renders the Avatar from the user
 * @param avatar URL
 * @param size size as percent of the horizontal window dimension
 * @returns
 */

const Avatar: React.FC<Props> = ({ avatar, size }) => {
	const uri = avatar
		? avatar
		: 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

	const s = size ? size : 15;
	return (
		<Image
			resizeMode='cover'
			resizeMethod='scale'
			source={{ uri: uri }}
			style={{
				height: spacing.wp(s),
				width: spacing.wp(s),
				borderRadius: spacing.wp(s) / 2,
			}}
		/>
	);
};

export default Avatar;
