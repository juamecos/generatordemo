import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './PreviewScreenStyle';
import { PreviewScreenProps } from './PreviewScreenProps';
import { useStone } from 'src/context/stoneContext/stoneContext';
import Avatar from 'src/components/Avatar';
import { useUser } from '../../context/userContext.tsx/userContext';
import { color, spacing } from 'src/theme';
import Text from 'src/components/Text';
import BackArrow from 'src/components/BackArrow';
import { cloudinaryUploader } from 'src/utils/Cloudinary';
import client from 'src/apollo/client';
import { AddStoneDocument, StonesDocument } from 'src/generated/graphql';
import CustomButton from 'src/components/CustomButton';

/**
 * Screen component description
 *
 * @returns Screen
 */
const PreviewScreen: FC<PreviewScreenProps> = ({ route, navigation }) => {
	// From the previous screen
	const initialParams = route?.params;

	// Context
	const { avatar, userName } = useUser();
	const { step, image, title, description, location, setStep } = useStone();

	const base64img = `data:image/png;base64,${image.base64}`;
	// Custom hooks

	// Internal state

	const [stoneData, setStoneData] = useState();

	const registerStone = async () => {
		await cloudinaryUploader(image)
			.then(res => res.json())
			.then(value => {
				if (value.secure_url) {
					client
						.mutate({
							variables: {
								stone: {
									image: value.secure_url,
									title: title,
									description: description,
									latitude: location.latitude,
									longitude: location.longitude,
								},
							},
							mutation: AddStoneDocument,
							refetchQueries: [StonesDocument],
						})
						.then(({ data }) => {
							if (data.addStone.status) {
								setStoneData(data.addStone.stone); // TODO check the server or the graphql as it in response there is password, code of stone and OTP info
								Toast.show({
									type: 'success',
									text1: data.addStone?.message!,
								});

								navigation?.navigate('HomeScreen');

								setStep(step + 1);
							}
						});
				}
			})
			.catch(error => {
				console.log('RegisterStone Error', error);
				Toast.show({
					type: 'error',
					text1: error.message!,
				});
			});
	};

	useEffect(() => {}, []);

	// Component JSX
	return (
		<View testID='PreviewScreen' style={styles.container}>
			<View style={styles.imageWrapper}>
				<Image
					source={{ uri: base64img }}
					style={styles.image}
					resizeMode='cover'
				/>
			</View>
			<View style={styles.infoWrapper}>
				<View style={styles.info}>
					<View style={styles.infoLeft}>
						<View style={styles.avatar}>
							<Avatar avatar={avatar ? avatar : ''} />
						</View>
					</View>
					<View style={styles.infoRight}>
						<View style={styles.userName}>
							<Text
								h2
								bold
								italic
								title={userName!}
								textColor={color.primaryDarker}
							/>
						</View>
						<View style={styles.stoneTitle}>
							<Text
								h4
								bold
								italic
								title={title || 'Este es el título y puede ser muy largo'}
								textColor={color.primary}
							/>
							<Text
								h5
								italic
								title={
									description ||
									'Esta es la descripción que también puede ser muy larga si el usuario se esplaya'
								}
								textColor={color.primary}
							/>
						</View>
					</View>
				</View>
			</View>
			<BackArrow />
			<View style={styles.buttonWrapper}>
				<CustomButton
					medium
					rounded
					disabled={!image.base64 && !location.latitude && !location.longitude}
					styleBtn={{
						width: '30%',
						// position: 'absolute',
						// bottom: spacing.hp(0),
						// right: spacing.wp(50),
						// transform: [{ translateX: 50 }],
					}}
					title='Publish'
					onPress={async () => {
						const result = await registerStone();

						console.log(result);

						// navigation?.navigate('SingleStoneScreen', { stone: stoneData });
						// navigation?.navigate('HomeScreen');
					}}
				/>
			</View>
		</View>
	);
};

export default PreviewScreen;
