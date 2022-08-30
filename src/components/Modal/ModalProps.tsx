import { Dispatch, SetStateAction } from 'react';

export interface Props {
	type?: 'fullScreen' | 'topModal';
	title?: string;
	transparent?: boolean;
	animationType?: 'none' | 'slide' | 'fade' | undefined;
	children: React.ReactNode;
	isVisible: boolean;
	acceptButton?: boolean;
	acceptButtonTitle?: string;
	acceptButtonColor?: string;
	cancelButton?: boolean;
	cancelButtonTitle?: string;
	cancelButtonColor?: string;
	closeButton?: boolean;
	acceptButtonOnPress?: () => void;
	cancelButtonOnPress?: () => void;
	handleClose: Dispatch<SetStateAction<boolean>>;
}
