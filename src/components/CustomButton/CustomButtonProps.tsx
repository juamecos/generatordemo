import { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';

export interface Props {
	title: string;
	styleBtn?: ViewStyle;
	styleText?: TextStyle;
	iconName?: string;
	primary?: boolean;
	secondary?: boolean;
	rounded?: boolean;
	bordered?: boolean;
	small?: boolean;
	medium?: boolean;
	large?: boolean;
	onPress: (event: GestureResponderEvent) => void;
}
