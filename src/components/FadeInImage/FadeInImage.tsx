import React, { useState } from 'react';
import {
	ActivityIndicator,
	Animated,
	ImageErrorEventData,
	ImageStyle,
	NativeSyntheticEvent,
	StyleProp,
	View,
} from 'react-native';
import { useAnimation } from 'src/hooks/useAnimated';

import { Props } from './FadeInImageProps';
import { color } from '../../theme/color';

export const FadeInImage = ({ uri, style = {} }: Props) => {
	const { opacity, fadeIn } = useAnimation();
	const [isLoading, setIsLoading] = useState(true);

	const finishLoading = () => {
		setIsLoading(false);
		fadeIn();
	};

	const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
		setIsLoading(false);
	};

	return (
		<View
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: color.dim,
				...(style as any),
			}}
		>
			{isLoading && (
				<ActivityIndicator
					style={{ position: 'absolute' }}
					color='grey'
					size={30}
				/>
			)}

			<Animated.Image
				source={{ uri }}
				onError={onError}
				onLoad={finishLoading}
				style={{
					...(style as any),
					opacity,
				}}
			/>
		</View>
	);
};
