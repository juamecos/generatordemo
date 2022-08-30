import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useRef } from 'react';
import {
	Animated,
	SafeAreaView,
	Image,
	StyleSheet,
	FlatList,
	View,
	StatusBar,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import CustomButton from 'src/components/CustomButton';
import Text from 'src/components/Text';
import { color, spacing } from 'src/theme';
import { constants } from 'src/theme/constants';
import { storeData, getData } from 'src/utils/Storage';

import styles from './WelcomeScreenStyle';
const bgs = [color.primary, color.primaryDarker, color.palette.purpleDarker];

const slides = [
	{
		id: '1',
		image: require('/home/mena/projects/lapix/lapix-frontend/src/assets/painting.jpg'),
		title: 'Paint your stones',
		subtitle:
			'Expand your creativity and spend quality time with your kids by painitng stones',
	},
	{
		id: '2',
		image: require('/home/mena/projects/lapix/lapix-frontend/src/assets/hidding-stone.jpg'),
		title: 'Hide your stones',
		subtitle:
			'Go for a walk with your kids and put the stones in a visible place close to a walk path',
	},
	{
		id: '3',
		image: require('/home/mena/projects/lapix/lapix-frontend/src/assets/finding-eggs.jpg'),
		title: 'Find others stones',
		subtitle: 'Use the map to localize the stones painted by other users',
	},
];

const Indicator = ({ scrollX }) => {
	return (
		<View
			style={{
				position: 'absolute',
				bottom: 100,
				flexDirection: 'row',
			}}
		>
			{slides.map((_, i) => {
				const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [0.8, 1.4, 0.8],
					extrapolate: 'clamp',
				});
				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.6, 0.9, 0.6],
					extrapolate: 'clamp',
				});
				return (
					<Animated.View
						key={`indicator-${i}`}
						style={{
							height: 10,
							width: 10,
							borderRadius: 5,
							backgroundColor: color.white,
							opacity,
							margin: 10,
							transform: [{ scale }],
						}}
					/>
				);
			})}
		</View>
	);
};

const Backdrop = ({ scrollX }) => {
	const backgroundColor = scrollX.interpolate({
		inputRange: bgs.map((_, i) => i * width),
		outputRange: bgs.map(bg => bg),
	});
	return (
		<Animated.View
			style={[
				StyleSheet.absoluteFill,
				{
					backgroundColor,
				},
			]}
		/>
	);
};

const Square = ({ scrollX }) => {
	const YOLO = Animated.modulo(
		Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
		1
	);

	const rotate = YOLO.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: ['35deg', '0deg', '35deg'],
	});
	const translateX = YOLO.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0, -height, 0],
	});

	//TODO skip, continue and getting started buttons
	return (
		<Animated.View
			style={{
				width: height,
				height: height,
				borderRadius: width / 5,
				backgroundColor: color.white,
				position: 'absolute',
				top: -height * 0.6,
				left: -height * 0.3,
				transform: [
					{
						rotate,
					},
					{ translateX },
				],
			}}
		/>
	);
};

const width = spacing.wp(100);
const height = spacing.hp(100);

const WelcomeScreen = ({ navigation }) => {
	const scrollX = useRef(new Animated.Value(0)).current;
	const onSkip = async () => {
		await storeData('isFirstLaunch', 'false');
		navigation.replace('LoginScreen');
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<Backdrop scrollX={scrollX} />
			<Square scrollX={scrollX} />
			<Animated.FlatList
				data={slides}
				keyExtractor={item => item.id}
				horizontal
				scrollEventThrottle={32}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => {
					return (
						<View style={{ width, alignItems: 'center', padding: 20 }}>
							<View
								style={{
									flex: 0.7,
									justifyContent: 'center',
								}}
							>
								<Image
									source={item.image}
									style={{ width: width / 2 }}
									resizeMode='contain'
								/>
							</View>
							<View style={{ flex: 0.3 }}>
								<Text
									h1
									bold
									textShadow
									title={item.title}
									textColor={color.white}
								/>
								<Text
									h3
									title={item.subtitle}
									textColor={color.palette.white}
								/>
							</View>
						</View>
					);
				}}
			/>
			<Indicator scrollX={scrollX} />
			<View
				// eslint-disable-next-line react-native/no-inline-styles
				style={{
					width: '100%',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}
			>
				<CustomButton
					bordered
					rounded
					primary
					small
					title={`Skip`}
					onPress={() => onSkip()}
				/>
			</View>
		</SafeAreaView>
	);
};

export default WelcomeScreen;
