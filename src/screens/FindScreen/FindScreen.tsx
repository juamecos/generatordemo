import React, { FC } from 'react';
import { SafeAreaView, View } from 'react-native';
import { FindScreenProps } from './FindScreenProps';

import LoadingScreen from '../LoadingScreen';

import { useStonesQuery } from 'src/generated/graphql';
import ClusterMap from 'src/components/ClusterMap';
import CrimeMap from 'src/components/CrimeMap';
import ClusteringMap from 'src/components/ClusteringMap';
import ClustererMap from 'src/components/ClustererMap';
import Title from 'src/components/Title';
import Text from 'src/components/Text';
import CustomButton from 'src/components/CustomButton';
import { Icon } from 'react-native-vector-icons/Icon';
import { spacing } from '../../theme/spacing';
import IconText from 'src/components/IconText';

/**
 * Screen component description
 *
 * @returns Screen
 */
const FindScreen: FC<FindScreenProps> = () => {
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
			<Title title='Have you find a stone?' />
			<ClusteringMap data={data} />
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<CustomButton
					medium
					rounded
					iconName='search'
					iconSize={20}
					styleText={{ fontSize: 20 }}
					title="I've found a stone"
					onPress={() => {}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default FindScreen;
