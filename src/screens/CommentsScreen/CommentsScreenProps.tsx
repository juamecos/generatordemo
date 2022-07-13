// @ts-nocheck
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/navigation/MainNavigator';

type CommentsScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'CommentsScreen'
>;
type CommentsScreenRouteProp = RouteProp<RootStackParamList, 'CommentsScreen'>;

export type CommentsScreenProps = {
	navigation?: CommentsScreenNavigationProp;
	route?: CommentsScreenRouteProp;
	otherProps?: any;
};

export interface ICommentPageInfo {
	__typename?: 'ResultInfo' | undefined;
	page: number;
	total: number;
	itemsPage: number;
	pages: number;
}

export interface CommentData {
	__typename?: 'ResultComments' | undefined;
	status: boolean;
	message: string;
	info?: ICommentPageInfo | undefined;
	comments?: IComment[] | undefined;
}
