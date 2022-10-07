import React, { FC, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { FindScreenProps } from './FindScreenProps';

import LoadingScreen from '../LoadingScreen';

import { useStonesQuery } from 'src/generated/graphql';
import ClusterMap from 'src/components/ClusterMap';

import Title from 'src/components/Title';
import Text from 'src/components/Text';
import CustomButton from 'src/components/CustomButton';

import { color, spacing } from 'src/theme';
import BackArrow from 'src/components/BackArrow';

/**
 * Screen component description
 *
 * @returns Screen
 */
const FindScreen: FC<FindScreenProps> = ({ navigation }) => {
	// Context

	// Custom hooks
	// const { t } = useTranslation();

	// const changeLang = lng => {
	// 	i18n.changeLanguage(lng); // This gets changes the language from the i18n Provider
	// };

	const { data, error, loading } = useStonesQuery({
		variables: {
			page: 1,
			itemsPage: 20,
		},
	});

	if (loading) {
		return <LoadingScreen />;
	}

	if (error) {
		console.log(error);
	}

	return (
		// <View testID='FindScreen'>
		// 	<Text>{t('title', { ns: 'test' })}</Text>
		// 	<Text>{t('subtitle', { ns: 'test' })}</Text>
		// 	<Text>{t('subtitle', { ns: 'test' })}</Text>
		// 	<Button title='English' onPress={() => changeLang('en')} />
		// 	<Button title='Español' onPress={() => changeLang('es')} />
		// 	<Button title='Cestina' onPress={() => changeLang('cs')} />
		// </View>
		<SafeAreaView style={{ flex: 1 }}>
			<ClusterMap data={data} />

			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<CustomButton
					medium
					rounded
					secondary
					bordered={false}
					styleBtn={{
						borderColor: color.transparent,
						elevation: 9,
						position: 'absolute',
						bottom: spacing.hp(15),
					}}
					iconName='eye-outline'
					iconSize={20}
					styleText={{ fontSize: 20 }}
					title="I've found a stone"
					onPress={() => {
						navigation?.navigate('FoundStoneCodeScreen');
					}}
				/>
			</View>
			<BackArrow />
		</SafeAreaView>
	);
};

export default FindScreen;
