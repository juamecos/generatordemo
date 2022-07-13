import React from 'react';
import { View } from 'react-native';
import { usePermissions } from 'src/context/permissionsContext/permissionsContext';
import { shadow } from 'src/theme/shadow';
import CustomButton from '../CustomButton';
import Text from '../Text';
import styles from './PermissionsComponentStyle';

export type Props = {
	name?: string;
};

const PermissionsComponent: React.FC<Props> = ({ ...props }) => {
	const { checkLocationPermission, askLocationPermission } = usePermissions();
	return (
		<View testID='PermissionsComponent'>
			<Text
				h3
				style={styles.title}
				title='In this app the use of the GPS is required'
			/>

			<CustomButton
				large
				rounded
				primary
				title='Permission'
				styleBtn={{ ...shadow.light }}
				onPress={askLocationPermission}
			/>
		</View>
	);
};

export default PermissionsComponent;
