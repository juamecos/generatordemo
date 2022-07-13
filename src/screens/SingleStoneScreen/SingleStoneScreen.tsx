import React, { FC, useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import styles from './SingleStoneScreenStyle';
import { SingleStoneScreenProps } from './SingleStoneScreenProps';
import Text from 'src/components/Text';
import { timeAgo } from 'src/utils/time';

import Avatar from 'src/components/Avatar';
import { spacing, color } from 'src/theme';
import BackArrow from 'src/components/BackArrow';
import { useStoneQuery } from 'src/generated/graphql';
import Loader from 'src/components/Loader';
import Toast from 'react-native-toast-message';

/**
 * Screen component description
 *
 * @returns Screen
 */
const SingleStoneScreen: FC<SingleStoneScreenProps> = ({
	route,
	navigation,
}) => {
	const initialParams = route?.params;

	// const [stone, setStone] = useState();

	const { data, loading, error } = useStoneQuery({
		variables: {
			stoneId: initialParams.id,
		},
		fetchPolicy: 'cache-first',
	});

	if (loading) {
		<Loader />;
	}

	if (error) {
		console.log(`[${error.name}] - ${error.message}`);
	}

	if (!data?.stone?.stone) {
		return null;
	}

	const stone = data?.stone?.stone;

	// Component JSX
	return (
		<ScrollView
			testID='SingleStoneScreen'
			style={styles.container}
			persistentScrollbar={false}
		>
			<View style={styles.imageWrapper}>
				<Image
					source={{ uri: stone.image }}
					style={styles.image}
					resizeMode='cover'
				/>
			</View>
			<View style={styles.wrapperInfo}>
				<View style={styles.info}>
					<View style={styles.infoLeft}>
						<View style={styles.avatar}>
							<Avatar
								avatar={stone.user.avatar ? stone.user.avatar : ''}
								radius={spacing.vertical.large / 2}
							/>
						</View>
					</View>
					<View style={styles.infoRight}>
						<View style={styles.userName}>
							<Text
								h2
								bold
								italic
								title={stone.user.userName!}
								textColor={color.primaryDarker}
							/>
						</View>
						<View style={styles.stoneTitle}>
							<Text
								h4
								bold
								italic
								title={stone.title || 'Este es el título y puede ser muy largo'}
								textColor={color.primary}
							/>
							<Text
								h5
								italic
								title={
									stone.description ||
									'Esta es la descripción que también puede ser muy larga si el usuario se esplaya'
								}
								textColor={color.primary}
							/>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.info}>
				<View
					style={[
						styles.infoLeft,
						{ paddingHorizontal: spacing.horizontal.tiny },
					]}
				>
					<Text h4 title='Info' textColor={color.primary} />
				</View>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.infoItem}>
						<Text title={'Published'} textColor={color.primary} />
						<Text
							bold
							title={timeAgo(stone.registerDate)}
							textColor={color.primaryDarker}
						/>
					</View>
					<View style={styles.infoItem}>
						<Text title={'Comments'} textColor={color.primary} />
						<Text
							bold
							title={stone.commentCount!.toString()}
							textColor={color.primaryDarker}
						/>
					</View>
					<View style={styles.infoItem}>
						<Text title={'Likes'} textColor={color.primary} />
						<Text
							bold
							title={stone.likeCount.toString()}
							textColor={color.primaryDarker}
						/>
					</View>
					<View style={styles.infoItem}>
						<Text title={'Founds'} textColor={color.primary} />
						<Text
							bold
							title={stone.foundCount.toString()}
							textColor={color.primaryDarker}
						/>
					</View>
				</ScrollView>
			</View>
			<BackArrow />
		</ScrollView>
	);
};

export default SingleStoneScreen;
