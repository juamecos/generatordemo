// @ts-nocheck
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/navigation/MainNavigator";


type FoundStoneMapScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FoundStoneMapScreen'
>;
type FoundStoneMapScreenRouteProp = RouteProp<RootStackParamList, 'FoundStoneMapScreen'>;

export type FoundStoneMapScreenProps = {
  navigation?: FoundStoneMapScreenNavigationProp;
  route?: FoundStoneMapScreenRouteProp;
  otherProps?: any;
};