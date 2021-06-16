import React, { FC } from 'react';
import style from './HomeScreenStyle';
import { HomeScreenProps } from './HomeScreenProps';
import { View } from 'react-native';
import Button from 'src/components/CustomButton';
import Text from 'src/components/Text';

/**
 * Screen component description
 *
 * @returns Screen
 */
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
	return (
		<View style={style.container} testID='HomeScreen'>
			<Text h1 bold title='This is Home Screen' />

			<Button
				title='Go to AboutScreen'
				onPress={() => navigation?.navigate('AboutScreen')}
			/>
		</View>
	);
};

export default HomeScreen;
