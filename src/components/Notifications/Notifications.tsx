import React, { Component, useState, useRef } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	FlatList,
} from 'react-native';
import styles from './NotificationsStyle';
import NotificationItem from '../NotificationItem/NotificationItem';

const Notifications = props => {
	const [data, setData] = useState([
		{
			id: 3,
			avatar: 'https://bootdey.com/img/Content/avatar/avatar7.png',
			name: 'March SoulLaComa',
			text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
			attachment: 'https://via.placeholder.com/100x100/FFB6C1/000000',
		},
		{
			id: 2,
			avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png',
			name: 'John DoeLink',
			text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
			attachment: 'https://via.placeholder.com/100x100/20B2AA/000000',
		},
		{
			id: 4,
			avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
			name: 'Finn DoRemiFaso',
			text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
			attachment: '',
		},
		{
			id: 5,
			avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png',
			name: 'Maria More More',
			text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
			attachment: '',
		},
		{
			id: 1,
			avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
			name: 'Frank Odalthh',
			text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
			attachment: 'https://via.placeholder.com/100x100/7B68EE/000000',
		},
		{
			id: 6,
			avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png',
			name: 'Clark June Boom!',
			text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
			attachment: '',
		},
		{
			id: 7,
			avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png',
			name: 'The googler',
			text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
			attachment: '',
		},
	]);

	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			style={styles.root}
			data={data}
			keyExtractor={(item, index) => index.toString()}
			renderItem={NotificationItem}
		/>
	);
};

export default Notifications;
