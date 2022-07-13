// @ts-nocheck
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/navigation/MainNavigator";


type SingleUserScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SingleUserScreen'
>;
type SingleUserScreenRouteProp = RouteProp<RootStackParamList, 'SingleUserScreen'>;

export type SingleUserScreenProps = {
  navigation?: SingleUserScreenNavigationProp;
  route?: SingleUserScreenRouteProp;
  otherProps?: any;
};