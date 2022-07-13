// @ts-nocheck
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/navigation/MainNavigator";


type ImagePickerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ImagePickerScreen'
>;
type ImagePickerScreenRouteProp = RouteProp<RootStackParamList, 'ImagePickerScreen'>;

export type ImagePickerScreenProps = {
  navigation?: ImagePickerScreenNavigationProp;
  route?: ImagePickerScreenRouteProp;
  otherProps?: any;
};