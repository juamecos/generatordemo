// @ts-nocheck
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/navigation/MainNavigator";


type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WelcomeScreen'
>;
type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'WelcomeScreen'>;

export type WelcomeScreenProps = {
  navigation?: WelcomeScreenNavigationProp;
  route?: WelcomeScreenRouteProp;
  otherProps?: any;
};