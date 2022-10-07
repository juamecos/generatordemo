import { Asset } from 'react-native-image-picker';

export enum stepsFoundEnum {
	SET_FOUND_CODE = 0,
	SET_FOUND_LOCATION = 1,
	TAKE_FOUND_PICTURE = 2,
}

export interface ILocation {
	latitude: number;
	longitude: number;
}

export interface FoundState {
	step: stepsFoundEnum;
	code: string;
	image: Asset | null;
	location: ILocation;
}

export type FoundAction =
	| { type: 'SET_FOUND_STEP'; step: stepsFoundEnum | undefined | null }
	| { type: 'SET_FOUND_CODE'; code: string }
	| { type: 'SET_FOUND_IMAGE'; image: Asset | null }
	| { type: 'SET_FOUND_LOCATION'; location: ILocation };

export type FoundPayload = stepsFoundEnum | string | Asset | ILocation | null;

export interface FoundContextActions {
	setFoundStep: (data: FoundPayload) => void;
	setFoundCode: (data: FoundPayload) => void;
	setFoundLocation: (data: FoundPayload) => void;
	setFoundImage: (data: FoundPayload) => void;
}

export interface FoundContextType extends FoundState, FoundContextActions {}
