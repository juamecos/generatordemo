import React from 'react';
import { View, TouchableOpacity, GestureResponderEvent } from 'react-native';
import styles from './CustomTabBarButtonStyle';
import { shadow } from '../../theme/shadow';

export type Props = {
	onPress: (event: GestureResponderEvent) => void;
	children: React.ReactNode;
};

const CustomTabBarButton: React.FC<Props> = ({ onPress, children }) => {
	return (
		<TouchableOpacity
			testID='CustomTabBarButton'
			activeOpacity={0.85}
			style={{
				...styles.container,
			}}
			onPress={onPress}
		>
			<View style={[styles.wrapper, shadow.dark]}>{children}</View>
		</TouchableOpacity>
	);
};

export default CustomTabBarButton;
