import React, { FC, useState, useEffect, useRef } from 'react';
import { Image, SafeAreaView, View, FlatList } from 'react-native';
import styles from './CommentsScreenStyle';
import {
	CommentData,
	CommentsScreenProps,
	ICommentPageInfo,
} from './CommentsScreenProps';
import Comment from 'src/components/Comment';
import CommentBox from 'src/components/CommentBox';
import { color } from 'src/theme';
import Text from 'src/components/Text';
import { useCommentsQuery } from 'src/generated/graphql';
import Loader from 'src/components/Loader';

import { IComment } from 'src/interfaces/IComment';
import BackArrow from 'src/components/BackArrow';

/**
 * Screen component description
 *
 * @returns Screen
 */
const CommentsScreen: FC<CommentsScreenProps> = ({ route, navigation }) => {
	const { stone } = route?.params;
	console.log('commets route', route);

	const [isFetching, setIsFetching] = useState(false);

	const { data, error, loading, fetchMore, refetch } = useCommentsQuery({
		fetchPolicy: 'cache-and-network',
		variables: {
			stoneID: stone.id,
			page: 1,
			itemsPage: 20,
		},
	});

	const commentsArray: any = useRef([]);
	const commentsInfoPage = useRef({} as ICommentPageInfo);

	if (data && data?.comments?.info) {
		commentsInfoPage.current = data?.comments.info;
	}

	const onRefresh = () => {
		setIsFetching(true);
		refetch();
		setIsFetching(false);
	};

	const handleOnEndReached = () => {
		console.log('End reached');

		if (
			commentsInfoPage.current.page &&
			commentsInfoPage.current.page < commentsInfoPage.current.pages
		) {
			return fetchMore({
				variables: {
					stoneID: stone.id,
					page: commentsInfoPage.current.page + 1,
					itemsPage: commentsInfoPage.current.itemsPage,
				},
				updateQuery: onUpdate,
			});
		}
	};

	const onUpdate = (prev: CommentData, { fetchMoreResult }) => {
		if (!fetchMoreResult) {
			return prev;
		}
		if (!prev) {
			return [{}];
		}

		const {
			info: newInfo,
			status: newStatus,
			message: newMessage,
			comments: newComments,
		} = fetchMoreResult.comments;

		const prevComments = prev.comments.comments!;

		const comments = [...prevComments, ...newComments];

		return Object.assign({}, prev, {
			comments: {
				__typename: prev.__typename,
				info: newInfo,
				status: fetchMoreResult.comments.status,
				message: fetchMoreResult.comments.message,
				comments,
			},
		});
	};

	if (data?.comments && data?.comments.comments) {
		commentsArray.current = data.comments?.comments;
	}

	if (error) {
		return new Error(error.message);
	}
	if (loading) {
		<Loader />;
	}

	const renderItem = ({ item }: { item: IComment }) => (
		<Comment
			comment={item}
			onPress={() => console.log(item.comment, item.user.userName)}
		/>
	);

	const renderNumberOfComments = () => {
		return (
			<View style={styles.commentCounter}>
				<Text
					h3
					bold
					textColor={color.primary}
					title={
						stone.comments.length > 0
							? `Comments (${stone.comments.length})`
							: 'No comments found'
					}
				/>
			</View>
		);
	};

	const renderHeader = () => {
		return (
			<>
				<Image
					// source={stone?.image ? stone?.image : null}
					source={{ uri: stone?.image }}
					style={styles.image}
				/>
				<BackArrow />

				<CommentBox stoneID={stone.id} />
				{/* {commentsLoading && <Loader />} */}
				{/* {commentsError && <Text h5 title={commentsError.message} />} */}
				{renderNumberOfComments()}
			</>
		);
	};

	return (
		<>
			<FlatList
				showsVerticalScrollIndicator={false}
				// contentContainerStyle={style.feedContainer}
				data={commentsArray.current}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				onRefresh={onRefresh}
				refreshing={isFetching}
				onEndReachedThreshold={0.4} // Thus a value of 0.5 will trigger onEndReached when the end of the content is within half the visible length of the list.
				onEndReached={handleOnEndReached}
				ListHeaderComponent={renderHeader}
			/>
		</>
	);
};

export default CommentsScreen;
