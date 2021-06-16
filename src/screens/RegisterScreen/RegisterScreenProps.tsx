// @ts-nocheck
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/navigation/MainNavigator";


type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RegisterScreen'
>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'RegisterScreen'>;

export type RegisterScreenProps = {
  navigation?: RegisterScreenNavigationProp;
  route?: RegisterScreenRouteProp;
  otherProps?: any;
};