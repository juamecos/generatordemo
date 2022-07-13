import { useRef, useState } from 'react';
import { useCommentsQuery } from 'src/generated/graphql';
import { IComment } from 'src/interfaces/IComment';
import Loader from 'src/components/Loader';

interface ICommentPageInfo {
	__typename?: 'ResultInfo' | undefined;
	page: number;
	total: number;
	itemsPage: number;
	pages: number;
}

interface CommentData {
	__typename?: 'ResultComments' | undefined;
	status: boolean;
	message: string;
	info?: ICommentPageInfo | undefined;
	comments?: IComment[] | undefined;
}

const initialSelected = null;
const itemsPage = 10;

export const useCommentsHook = (stoneID: number): UseCommentsResult => {
	const [isFetching, setIsFetching] = useState(false);
	const { data, error, loading, fetchMore, refetch } = useCommentsQuery({
		fetchPolicy: 'cache-and-network',
		variables: {
			stoneID,
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
					stoneID,
					page: commentsInfoPage.current.page + 1,
					itemsPage,
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
	}

	return {
		commentsInfoPage,
		commentsArray,
		isFetching,

		onRefresh,
		handleOnEndReached,
	};
};
