import React, { createContext, useReducer } from 'react';
import {
	FoundState,
	FoundContextType,
	FoundContextActions,
	ILocation,
} from './foundContextTypes';
import { ImagePickerResponse } from 'react-native-image-picker';
import { FoundReducer } from './foundContextReducer';

const initialState: FoundState = {
	step: 0,
	code: '',
	image: {
		didCancel: false,
		errorCode: 'camera_unavailable',
		errorMessage: '',
		assets: [],
	},
	location: {
		latitude: 0,
		longitude: 0,
	},
};

const FoundContext = createContext<FoundContextType>({
	step: 0,
	code: '',
	image: {
		didCancel: false,
		errorCode: 'camera_unavailable',
		errorMessage: '',
		assets: [],
	},
	location: {
		latitude: 0,
		longitude: 0,
	},
	setFoundStep: () => {},
	setFoundCode: () => {},
	setFoundLocation: () => {},
	setFoundImage: () => {},
});

export const FoundRef = React.createRef<FoundContextActions>();

export const useFound = (): FoundContextType => {
	const context = React.useContext(FoundContext);
	if (!context) {
		throw new Error('useAuth must be inside an AuthProvider with a value');
	}
	return context;
};

export const FoundProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(FoundReducer, initialState);

	React.useImperativeHandle(FoundRef, () => foundActions);

	const foundActions: FoundContextActions = {
		setFoundStep: (step: number) => {
			dispatch({ type: 'SET_FOUND_STEP', step });
		},
		setFoundCode: (code: string) => {
			dispatch({ type: 'SET_FOUND_CODE', code });
		},
		setFoundImage: (image: ImagePickerResponse) => {
			dispatch({ type: 'SET_FOUND_IMAGE', image });
		},
		setFoundLocation: (location: ILocation) => {
			dispatch({ type: 'SET_FOUND_LOCATION', location });
		},
	};

	return (
		<FoundContext.Provider value={{ ...state, ...foundActions }}>
			{children}
		</FoundContext.Provider>
	);
};
