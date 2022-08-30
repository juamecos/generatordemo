import React from 'react';
import { View, Text, Image } from 'react-native';
import Avatar from '../Avatar';
import styles from './NotificationItemStyle';

export type Props = {
	name?: string;
};
// TODO type item as notification
const NotificationItem: React.FC<Props> = ({ item }: any) => {
	let attachment = <View />;
	let mainContentStyle;

	if (item.attachment) {
		mainContentStyle = styles.mainContent;
		attachment = (
			<Image
				style={styles.attachment}
				source={{
					uri: item.attachment,
				}}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<Avatar avatar={item.avatar} />
			<View style={styles.content}>
				<View style={mainContentStyle}>
					<View style={styles.text}>
						<Text style={styles.name}>{item.name}</Text>
						<Text>{item.text}</Text>
					</View>
					<Text style={styles.timeAgo}>2 hours ago</Text>
				</View>
				{attachment}
			</View>
		</View>
	);
};

export default NotificationItem;
