// @ts-nocheck
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/navigation/MainNavigator";


type PreviewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PreviewScreen'
>;
type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'PreviewScreen'>;

export type PreviewScreenProps = {
  navigation?: PreviewScreenNavigationProp;
  route?: PreviewScreenRouteProp;
  otherProps?: any;
};