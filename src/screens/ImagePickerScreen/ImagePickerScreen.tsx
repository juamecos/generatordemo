import React, { FC, useEffect } from 'react';
import { Image, SafeAreaView, Text } from 'react-native';
import style from './ImagePickerScreenStyle';
import { ImagePickerScreenProps } from './ImagePickerScreenProps';
import ImagePickerOpenButtons from 'src/components/ImagePickerOpenButtons';
import { useStone } from 'src/context/stoneContext/stoneContext';
import { stepsEnum } from 'src/context/stoneContext/stoneContextTypes';
import CustomButton from 'src/components/CustomButton';
import { FadeInImage } from '../../components/FadeInImage/FadeInImage';
import BackArrow from 'src/components/BackArrow';
import { useAuth } from 'src/context/authContext/authContext';
import { spacing } from '../../theme/spacing';

/**
 * Screen component description
 *
 * @returns Screen
 */
const ImagePickerScreen: FC<ImagePickerScreenProps> = ({
	route,
	navigation,
}) => {
	const { image } = useStone();
	const base64img = `data:image/jpeg;base64,${image.base64}`;

	// Component JSX
	return (
		<SafeAreaView style={{ flex: 1 }} testID='ImagePickerScreen'>
			{image.base64 ? (
				<Image
					style={{
						height: spacing.hp(100),
						width: spacing.wp(100),
					}}
					source={{ uri: base64img }}
				/>
			) : (
				<ImagePickerOpenButtons />
			)}

			<CustomButton
				medium
				rounded
				disabled={!image.base64}
				styleBtn={{
					width: '30%',
					position: 'absolute',
					bottom: spacing.hp(20),
					right: spacing.wp(50),
					transform: [{ translateX: 50 }],
				}}
				title='Next'
				onPress={async () => {
					navigation?.navigate('LocationScreen');
				}}
			/>

			<BackArrow />
		</SafeAreaView>
	);
};

export default ImagePickerScreen;
