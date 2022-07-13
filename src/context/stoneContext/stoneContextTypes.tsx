import { Asset, ImagePickerResponse } from 'react-native-image-picker';

export enum stepsEnum {
	TAKE_PICTURE = 0,
	SET_LOCATION = 1,
	SET_INFO = 2,
	PREVIEW = 3,
	PUBLISHED = 4,
}

export interface ILocation {
	latitude: number;
	longitude: number;
}
export interface IInfo {
	title: string;
	description: string;
}
export interface StoneState {
	step: stepsEnum;
	image: Asset;
	location: ILocation;
	title: string;
	description: string;
}

export type StoneAction =
	| { type: 'SET_STEP'; step: stepsEnum | undefined | null }
	| { type: 'SET_IMAGE'; image: Asset }
	| { type: 'SET_LOCATION'; location: ILocation }
	| { type: 'SET_INFO'; info: { title: string; description: string } };

export type StonePayload = stepsEnum | string | Asset | ILocation | IInfo;

export interface StoneContextActions {
	setStep: (data: StonePayload) => void;
	setImage: (data: StonePayload) => void;
	setLocation: (data: StonePayload) => void;
	setInfo: (data: StonePayload) => void;
}

export interface StoneContextType extends StoneState, StoneContextActions {}
