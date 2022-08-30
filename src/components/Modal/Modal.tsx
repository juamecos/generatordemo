import React from 'react';
import { Modal as RNModal, View, Animated } from 'react-native';
import Text from 'src/components/Text';
import CustomButton from '../CustomButton';
import { Props } from './ModalProps';
import styles from './ModalStyle';
import CloseButton from 'src/components/CloseButton';
import { color } from 'src/theme';

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
	type = 'fullScreen',
	transparent = true,
	isVisible,
	title,
	acceptButton,
	acceptButtonColor,
	acceptButtonTitle = 'Accept',
	acceptButtonOnPress,
	cancelButton,
	cancelButtonColor,
	cancelButtonTitle = 'Cancel',
	cancelButtonOnPress,
	closeButton = true,
	handleClose,
	animationType = 'slide',
	children,
}: any): any => {
	return (
		<RNModal
			transparent={transparent}
			visible={isVisible}
			animationType={animationType}
		>
			<Animated.View
				style={[
					styles.modalContainer,
					type === 'fullScreen' && styles.fullScreenModal,

					type === 'topModal' && styles.topModal,
				]}
			>
				<View
					style={[
						styles.modalContent,
						// eslint-disable-next-line react-native/no-inline-styles
						!title && { paddingTop: 0 },
					]}
				>
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
								styleBtn={{
									backgroundColor: acceptButtonColor
										? acceptButtonColor
										: color.primary,
								}}
								title={acceptButtonTitle}
								onPress={() => acceptButtonOnPress && acceptButtonOnPress()}
							/>
						)}
						{cancelButton && (
							<CustomButton
								rounded
								medium
								styleBtn={{
									backgroundColor: cancelButtonColor
										? cancelButtonColor
										: color.palette.red,
								}}
								title={cancelButtonTitle}
								onPress={() => cancelButtonOnPress && cancelButtonOnPress()}
							/>
						)}
					</View>
				</View>
				{closeButton && <CloseButton handleClose={() => handleClose(false)} />}
			</Animated.View>
		</RNModal>
	);
};

export default Modal;
