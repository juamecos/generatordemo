import React, { FC, useEffect, useState, useRef } from 'react';
import { Image, ScrollView, View, Animated } from 'react-native';
import styles from './SingleStoneScreenStyle';
import { SingleStoneScreenProps } from './SingleStoneScreenProps';
import Text from 'src/components/Text';
import { timeAgo } from 'src/utils/time';

import Avatar from 'src/components/Avatar';
import { spacing, color } from 'src/theme';
import BackArrow from 'src/components/BackArrow';
import { useStoneQuery } from 'src/generated/graphql';
import Loader from 'src/components/Loader';
import {
	PinchGestureHandler,
	PinchGestureHandlerStateChangeEvent,
	State,
} from 'react-native-gesture-handler';
import ZoomableImage from 'src/components/ZoomableImage';

/**
 * Screen component description
 *
 * @returns Screen
 */
const SingleStoneScreen: FC<SingleStoneScreenProps> = ({
	route,
	navigation,
}) => {
	const pinchRef = useRef<PinchGestureHandler>();
	console.log(pinchRef.current);

	const initialParams = route?.params;
	const pinchScale = useRef(new Animated.Value(1)).current;
	const baseScale = useRef(new Animated.Value(1)).current;
	const scale = Animated.multiply(baseScale, pinchScale);
	const [lastScale, setLastScale] = useState(1);

	// const [stone, setStone] = useState();

	const { data, loading, error } = useStoneQuery({
		variables: {
			stoneId: initialParams.id,
		},
		fetchPolicy: 'cache-first',
	});

	const onPinchGestureEvent = Animated.event(
		[{ nativeEvent: { scale: pinchScale } }],
		{
			useNativeDriver: true,
		}
	);

	const onHandlerStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			setLastScale(value => value * event.nativeEvent.scale);
			baseScale.setValue(lastScale);
			pinchScale.setValue(1);
		}
	};

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

	const imageWidth = spacing.wp(100);
	const imageHeight = spacing.hp(66);

	// Component JSX
	return (
		<ScrollView
			testID='SingleStoneScreen'
			style={styles.container}
			persistentScrollbar={false}
		>
			<View style={styles.imageWrapper}>
				<ZoomableImage
					image={stone.image}
					imageWidth={imageWidth}
					imageHeight={imageHeight}
				/>
			</View>
			<View style={styles.wrapperInfo}>
				<View style={styles.info}>
					<View style={styles.infoLeft}>
						<View style={styles.avatar}>
							<Avatar
								avatar={stone.user.avatar ? stone.user.avatar : ''}
								size={spacing.vertical.small / 3}
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
								title={stone.title}
								textColor={color.primary}
							/>
							<Text
								h5
								italic
								title={stone.description}
								textColor={color.primary}
							/>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.info}>
				<View style={styles.infoLeft}>
					<Text
						h4
						title='Info'
						textColor={color.primary}
						style={styles.infoText}
					/>
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
