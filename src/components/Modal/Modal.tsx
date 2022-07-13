import React from 'react';
import { Modal as RNModal, View } from 'react-native';
import IconText from 'src/components/IconText';
import Text from 'src/components/Text';
import { color } from 'src/theme';
import CustomButton from '../CustomButton';
import { Props } from './ModalProps';
import styles from './ModalStyle';

/**
 *
 *
 * @param {*} {
 * 	isVisible,
 * 	title,
 * 	acceptButton,
 * 	acceptButtonTitle = 'Accept',
 * 	acceptButtonOnPress,
 * 	cancelButton,
 * 	cancelButtonTitle = 'Cancel',
 * 	cancelButtonOnPress,
 * 	handleClose,
 * 	animationType = 'slide',
 * 	children,
 * }
 * @return {*}
 */
const Modal: React.FC<Props> = ({
	isVisible,
	title,
	acceptButton,
	acceptButtonTitle = 'Accept',
	acceptButtonOnPress,
	cancelButton,
	cancelButtonTitle = 'Cancel',
	cancelButtonOnPress,
	handleClose,
	animationType = 'slide',
	children,
}: any): any => {
	return (
		<RNModal visible={isVisible} animationType={animationType}>
			<View style={styles.modalContainer}>
				<View style={[styles.modalContent, !title && { paddingTop: 0 }]}>
					{title && (
						<View style={styles.modalHeader}>
							<Text h2 bold title={title} />
						</View>
					)}
					{children}
					<View style={styles.modalFooter}>
						{acceptButton && (
							<CustomButton
								rounded
								medium
								title={acceptButtonTitle}
								onPress={() => acceptButtonOnPress && acceptButtonOnPress()}
							/>
						)}
						{cancelButton && (
							<CustomButton
								rounded
								danger
								medium
								title={cancelButtonTitle}
								onPress={() => cancelButtonOnPress && cancelButtonOnPress()}
							/>
						)}
					</View>
				</View>
			</View>
			<IconText
				iconName='close-outline'
				iconColor={color.textWhite}
				iconShadow
				size={45}
				onPress={() => handleClose(false)}
				style={styles.close}
			/>
		</RNModal>
	);
};

export default Modal;
