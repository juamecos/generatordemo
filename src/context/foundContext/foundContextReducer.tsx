import { FoundState, FoundAction } from './foundContextTypes';
export const FoundReducer = (prevState: FoundState, action: FoundAction) => {
	switch (action.type) {
		case 'SET_FOUND_STEP':
			return {
				...prevState,
				step: action.step,
			};
		case 'SET_FOUND_CODE':
			return {
				...prevState,
				code: action.code,
			};
		case 'SET_FOUND_IMAGE':
			return {
				...prevState,
				image: action.image,
			};
		case 'SET_FOUND_LOCATION':
			return {
				...prevState,
				location: action.location,
			};
		default:
			return prevState;
	}
};
