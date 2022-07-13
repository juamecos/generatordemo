// @ts-nocheck
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/navigation/MainNavigator";


type DescriptionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DescriptionScreen'
>;
type DescriptionScreenRouteProp = RouteProp<RootStackParamList, 'DescriptionScreen'>;

export type DescriptionScreenProps = {
  navigation?: DescriptionScreenNavigationProp;
  route?: DescriptionScreenRouteProp;
  otherProps?: any;
};