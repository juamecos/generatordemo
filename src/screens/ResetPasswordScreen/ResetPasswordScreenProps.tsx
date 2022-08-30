// @ts-nocheck
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/navigation/MainNavigator";


type ResetPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ResetPasswordScreen'
>;
type ResetPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ResetPasswordScreen'>;

export type ResetPasswordScreenProps = {
  navigation?: ResetPasswordScreenNavigationProp;
  route?: ResetPasswordScreenRouteProp;
  otherProps?: any;
};