import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import style from './LoadingScreenStyle';
import { LoadingScreenProps } from './LoadingScreenProps';
import Loader from 'src/components/Loader';

/**
 * Screen component description
 *
 * @returns Screen
 */
const LoadingScreen: FC<LoadingScreenProps> = () => {
	return (
		<SafeAreaView style={style.container} testID='LoadingScreen'>
			<Loader />
		</SafeAreaView>
	);
};

export default LoadingScreen;
