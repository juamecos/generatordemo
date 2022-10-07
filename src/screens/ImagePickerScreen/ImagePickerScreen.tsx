import React, { FC } from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { ImagePickerScreenProps } from './ImagePickerScreenProps';
import ImagePickerOpenButtons from 'src/components/ImagePickerOpenButtons';
import { useStone } from 'src/context/stoneContext/stoneContext';
import CustomButton from 'src/components/CustomButton';
import BackArrow from 'src/components/BackArrow';
import styles from './ImagePickerScreenStyle';
import Title from 'src/components/Title';
import { useFound } from '../../context/foundContext/foundContext';
import { useRoute } from '@react-navigation/native';
import { useAddFoundMutation } from '../../generated/graphql';
import { cloudinaryUploader } from '../../utils/Cloudinary';

/**
 * Screen component description
 *
 * @returns Screen
 */
const ImagePickerScreen: FC<ImagePickerScreenProps> = ({
	navigation,
	route,
}) => {
	const { entity } = route?.params;
	const {
		step: stoneStep,
		image: stoneImage,
		setImage: setStoneImage,
	} = useStone();
	const {
		step: foundStep,
		image: foundImage,
		setFoundImage,
		location,
		code,
	} = useFound();

	const [addFound, { data, error, loading, called }] = useAddFoundMutation();

	const imageURL = cloudinaryUploader(foundImage && foundImage);

	const step = entity === 'Stone' ? stoneStep : foundStep;
	const image = entity === 'Stone' ? stoneImage : foundImage;
	const setImage = entity === 'Stone' ? setStoneImage : setFoundImage;
	const onNextPress = () => {
		if (entity === 'Stone') {
			navigation?.navigate('LocationScreen');
		}
		if (entity === 'Found') {
			// Here mutation foundStone
			addFound({
				variables: {
					code,
					image: imageURL,
					longitude: location.longitude,
					latitude: location.latitude,
				},
			});
		}
	};

	const base64img = `data:image/jpeg;base64,${image?.base64}`;

	console.log(foundImage);

	const takeNewPicture = () => {
		setImage(null);
		navigation?.goBack();
	};

	// Component JSX
	return (
		<SafeAreaView style={styles.container} testID='ImagePickerScreen'>
			{image && image?.base64 ? (
				<>
					<Image style={styles.imageBase64} source={{ uri: base64img }} />
					<View style={styles.wrapperBtn}>
						<CustomButton
							medium
							rounded
							danger
							styleBtn={styles.dismissBtn}
							title='Dismiss'
							onPress={takeNewPicture}
						/>
						<CustomButton
							medium
							rounded
							secondary
							disabled={!image?.base64}
							styleBtn={styles.nextBtn}
							title='Next'
							onPress={onNextPress}
						/>
					</View>
				</>
			) : (
				<View>
					<Title title={'Take a picture'} styleText={styles.title} />
					<View style={styles.illustrationContainer}>
						<Image
							resizeMode='cover'
							resizeMethod='scale'
							source={require('src/assets/image_icon.png')}
							style={styles.illustration}
						/>
					</View>
					<ImagePickerOpenButtons />
				</View>
			)}

			<BackArrow onPress={takeNewPicture} />
		</SafeAreaView>
	);
};

export default ImagePickerScreen;
