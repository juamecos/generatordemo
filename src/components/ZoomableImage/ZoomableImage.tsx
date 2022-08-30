import React from 'react';
import { Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { Props } from './ZoomableImageProps';

const ZoomableImage: React.FC<Props> = ({
	image,
	imageHeight,
	imageWidth,
}: Props) => {
	return (
		<ImageZoom
			cropWidth={imageWidth}
			cropHeight={imageHeight}
			imageWidth={imageWidth}
			imageHeight={imageHeight}
			useNativeDriver
		>
			<Image
				style={{ width: imageWidth, height: imageHeight }}
				source={{
					uri: image,
				}}
				resizeMode='contain'
			/>
		</ImageZoom>
	);
};

export default ZoomableImage;
