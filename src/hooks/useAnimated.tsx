import { useRef, useState } from 'react';
import { Animated, Easing, LayoutAnimation } from 'react-native';

export const useAnimation = () => {
	const [showContent, setShowContent] = useState(false);
	const opacity = useRef(new Animated.Value(0)).current;
	const position = useRef(new Animated.Value(0)).current;
	const spinValue = useRef(new Animated.Value(0)).current;

	const fadeIn = (duration: number = 300) => {
		Animated.timing(opacity, {
			toValue: 1,
			duration,
			useNativeDriver: true,
		}).start();
	};

	const fadeOut = (duration: number = 300) => {
		Animated.timing(opacity, {
			toValue: 0,
			duration,
			useNativeDriver: true,
		}).start();
	};

	const startMovingPosition = (
		initPosition: number,
		duration: number = 300
	) => {
		position.setValue(initPosition);

		Animated.timing(position, {
			toValue: 0,
			duration,
			useNativeDriver: true,
			// easing: Easing.bounce
		}).start();
	};

	const toggleDropdown = (duration: number = 200) => {
		const config = {
			toValue: showContent ? 0 : 1,
			duration,
			useNativeDriver: true,
		};
		Animated.timing(position, config).start();
		LayoutAnimation.configureNext(toggleAnimation);
		setShowContent(!showContent);
	};

	const arrowTransform = position.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '90deg'],
	});

	const toggleAnimation = {
		duration: 500,
		update: {
			duration: 500,
			property: LayoutAnimation.Properties.opacity,
			type: LayoutAnimation.Types.easeInEaseOut,
		},
		delete: {
			duration: 500,
			property: LayoutAnimation.Properties.opacity,
			type: LayoutAnimation.Types.easeInEaseOut,
		},
	};

	const rotate = () => {
		console.log('rotate');

		Animated.timing(spinValue, {
			toValue: 1,
			duration: 750,
			useNativeDriver: true,
		}).start(() => {
			spinValue.setValue(0);
		});
		console.log(spinValue);
	};

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '45deg'],
	});

	return {
		opacity,
		position,
		spin,
		showContent,
		arrowTransform,
		toggleAnimation,
		fadeIn,
		fadeOut,
		rotate,
		startMovingPosition,
		setShowContent,
		toggleDropdown,
	};
};
