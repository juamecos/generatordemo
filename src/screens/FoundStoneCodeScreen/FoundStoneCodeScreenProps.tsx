// @ts-nocheck
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/navigation/MainNavigator';

type FoundStoneCodeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'FoundStoneCodeScreen'
>;
type FoundStoneCodeScreenRouteProp = RouteProp<
	RootStackParamList,
	'FoundStoneCodeScreen'
>;

export type FoundStoneCodeScreenProps = {
	navigation?: FoundStoneCodeScreenNavigationProp;
	route?: FoundStoneCodeScreenRouteProp;
	otherProps?: any;
};
