import React from 'react';
import { View } from 'react-native';
import useImagePicker from 'src/hooks/useImagePicker';
import styles from './ImagePickerOpenButtonsStyle';
import { color } from 'src/theme';
import IconText from 'src/components/IconText';
import { spacing } from '../../theme/spacing';

const ImagePickerOpenButtons: React.FC = () => {
	const { onHandleOpenLibrary, onHandleOpenCamera } = useImagePicker();

	return (
		<View testID='ImagePickerOpenButtons' style={styles.container}>
			<IconText
				h5
				bottom
				iconName={'camera-outline'}
				title={'Camera'}
				size={spacing.horizontal.small}
				onPress={() => onHandleOpenCamera()}
				iconColor={color.palette.white}
				textColor={color.textWhite}
				style={styles.cameraBtn}
			/>
			<IconText
				h5
				bottom
				iconName={'image-outline'}
				title={'Galery'}
				size={spacing.horizontal.small}
				onPress={() => onHandleOpenLibrary()}
				iconColor={color.palette.white}
				textColor={color.textWhite}
				style={styles.galeryBtn}
			/>
		</View>
	);
};

export default ImagePickerOpenButtons;
