import React, { FC, useEffect } from 'react';
import { SafeAreaView, FlatList, View, TouchableOpacity } from 'react-native';
import styles from './NotificationsScreenStyle';
import { NotificationsScreenProps } from './NotificationsScreenProps';
import Avatar from 'src/components/Avatar';
import Text from 'src/components/Text';
import Title from 'src/components/Title';
import { useTranslation } from 'react-i18next';
import { spacing } from 'src/theme';
import BackArrow from 'src/components/BackArrow';
import Notifications from 'src/components/Notifications';

/**
 * Screen component description
 *
 * @returns Screen
 */
const NotificationsScreen: FC<NotificationsScreenProps> = ({
	route,
	navigation,
}) => {
	// From the previous screen
	const initialParams = route?.params;

	// Context

	// Custom hooks
	const { t } = useTranslation();

	// Internal state

	useEffect(() => {}, []);

	// Component JSX
	return (
		<SafeAreaView
			// style={}
			testID='NotificationsScreen'
		>
			<Title title={t('notifications', { ns: 'bottomTab' })} />

			<Notifications />
			<BackArrow />
		</SafeAreaView>
	);
};

export default NotificationsScreen;
