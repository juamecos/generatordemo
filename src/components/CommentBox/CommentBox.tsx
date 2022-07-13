import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from 'src/theme';
import styles from './CommentBoxStyle';
import {
	useAddCommentMutation,
	CommentsDocument,
	StonesDocument,
} from 'src/generated/graphql';
import { useAuth } from 'src/context/authContext/authContext';
import { decodeToken } from 'src/utils/tokens';
import { IComment } from 'src/interfaces/IComment';
// import { IInfoPage } from 'src/interfaces/IInfoPage';

export type Props = {
	comments?: IComment[] | undefined | null;
	stoneID: number;
	infoPage: IInfoPage;
};

const CommentBox: React.FC<Props> = ({ stoneID }) => {
	const [comment, setComment] = useState<string>('');
	const { token } = useAuth();

	const info = decodeToken(token);

	const { user } = info;

	const userID = user.id;

	const [addComment] = useAddCommentMutation({
		refetchQueries: [StonesDocument, CommentsDocument],
	});

	const onPress = async () => {
		console.log('userID, ', userID, 'stoneID', stoneID, 'comment', comment);
		const result = await addComment({
			variables: {
				comment: {
					comment,
					stoneID,
					userID,
				},
			},
		});

		// toast(result.data?.addComment?.message, ToastType.success);

		setComment('');
	};

	return (
		<View testID='ComentBox' style={styles.container}>
			<TextInput
				style={styles.input}
				multiline={true}
				placeholder='Write something beautiful ...'
				value={comment}
				onChangeText={setComment}
			/>
			<Pressable
				style={styles.sendButton}
				onPress={onPress}
				disabled={!comment}
			>
				<Icon name='send-outline' size={20} color={color.primaryDarker} />
			</Pressable>
		</View>
	);
};

export default CommentBox;
