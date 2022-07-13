import React from 'react';
import { ImageBackground, View, TouchableOpacity } from 'react-native';
import styles from './CardStyle';
import Avatar from '../Avatar/Avatar';
import Text from '../Text';
import IconText from '../IconText';
import { IStone } from '../../interfaces/IStone';
import { timeSince } from 'src/utils/time';
import LikeIcon from '../LikeIcon/LikeIcon';
import { FadeInImage } from '../FadeInImage/FadeInImage';
import { spacing } from '../../theme/spacing';
import CommentIcon from '../CommentIcon/CommentIcon';

import { useNavigation } from '@react-navigation/native';

export type Props = {
	data: IStone;
	handleOnSelected: (id: number) => void | (() => {});
};

const Card: React.FC<Props> = ({ data }) => {
	const { navigate } = useNavigation();

	const time = timeSince(data.registerDate);

	return (
		<>
			<TouchableOpacity
				testID='Card'
				style={styles.card}
				onPress={() => {
					navigate('SingleStoneScreen', { id: data.id });
				}}
			>
				<View style={styles.container}>
					<View style={styles.header}>
						<TouchableOpacity
							style={styles.headerRight}
							onPress={() => {
								navigate('SingleUserScreen', {
									screen: 'SingleUserScreen',
									params: { userId: data.user.id },
								});
							}}
						>
							<View style={styles.avatar}>
								<Avatar
									avatar={data.user.avatar ? data.user.avatar : ''} //
									radius={spacing.horizontal.medium}
								/>
							</View>
							<View style={styles.info}>
								<View style={styles.userName}>
									<Text h4 bold title={data?.user.userName} />
								</View>
								<View style={styles.published}>
									<Text h5 title={time} />
								</View>
							</View>
						</TouchableOpacity>
						<View style={styles.headerLeft}>
							<View style={styles.menu}>
								<IconText
									h5
									bottom
									iconName='ellipsis-horizontal-outline'
									title='more'
								/>
							</View>
						</View>
					</View>
					<View style={styles.body}>
						<FadeInImage uri={data.image} style={styles.image} />
					</View>
					<View style={styles.footer}>
						<View style={styles.footerLeft}>
							<View style={styles.views}>
								<IconText
									h5
									// badge
									// badgeData={5}
									iconName='eye-outline'
									title='views'
									textStyle={styles.textIconStyle}
								/>
							</View>
						</View>
						<View style={styles.footerRight}>
							<LikeIcon data={data} />

							<CommentIcon
								data={data.comments}
								onHandleCommentPress={() =>
									navigate('CommentsScreen', { stone: data })
								}
							/>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};

export default Card;
