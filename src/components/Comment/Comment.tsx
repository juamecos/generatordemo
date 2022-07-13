import React, { ReactNode } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IComment } from 'src/interfaces/IComment';
import Avatar from '../Avatar';
import Text from '../Text';
import styles from './CommentStyle';
import { spacing } from '../../theme/spacing';
import { useNavigation } from '@react-navigation/native';
import { timeSince } from 'src/utils/time';
import { color } from 'src/theme';

export type Props = {
	comment: IComment;
	onPress: () => void;
};

const Comment: React.FC<Props> = ({ comment, onPress }) => {
	const { navigate } = useNavigation();
	const time = timeSince(comment.registerDate);
	return (
		<View testID='Comment'>
			<TouchableOpacity style={[styles.card]} onPress={onPress}>
				<TouchableOpacity
					activeOpacity={0.5}
					style={styles.commentRight}
					onPress={
						() => {}
						// navigate('PublicProfileScreen', { user: comment.user })
					}
				>
					<View style={styles.avatar}>
						<Avatar
							avatar={comment.user.avatar ? comment.user.avatar : ''}
							radius={40}
						/>
					</View>
				</TouchableOpacity>
				<View style={styles.commentLeft}>
					<View style={styles.userName}>
						<Text h5 bold title={comment.user.userName} />
					</View>
					<View style={styles.comment}>
						<Text h5 title={comment.comment} />
					</View>
					<View style={styles.published}>
						<Text h5 textColor={color.palette.lightGrey} title={time} />
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Comment;
