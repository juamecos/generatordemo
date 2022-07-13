import reactotron from 'reactotron-react-native';
import { AuthAction, AuthState } from './authContextTypes';

export const AuthReducer = (prevState: AuthState, action: AuthAction) => {
	switch (action.type) {
		case 'SIGN_IN':
			reactotron.log('Signin');
			return {
				...prevState,
				status: 'Authenticated',
				token: action.token,
			};
		case 'SIGN_OUT':
			reactotron.log('Signout');
			return {
				...prevState,
				status: 'Unauthenticated',
				token: null,
			};
		case 'CHECKING_AUTH':
			reactotron.log('Checking auth');
			return {
				...prevState,
				status: 'Checking',
				token: null,
			};
		default:
			return prevState;
	}
};
