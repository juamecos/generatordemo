// @ts-nocheck
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/navigation/MainNavigator";


type OTPScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OTPScreen'
>;
type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTPScreen'>;

export type OTPScreenProps = {
  navigation?: OTPScreenNavigationProp;
  route?: OTPScreenRouteProp;
  otherProps?: any;
};