import React, { useReducer } from 'react';
import { createContext } from 'react';
import client from 'src/apollo/client';
import { getData } from 'src/utils/Storage';
import { decodeToken, getToken, removeToken, setToken } from 'src/utils/tokens';
import { useUser } from '../userContext.tsx/userContext';
import {
	AuthAction,
	AuthContextActions,
	AuthContextType,
	AuthState,
} from './authContextTypes';
import { AuthReducer } from './authReducers';

const authInitState: AuthState = {
	status: 'Unauthenticated',
	token: null,
};

// TODO works when saving project

const AuthContext = createContext<AuthContextType>({
	status: 'Unauthenticated',
	token: '',
	signIn: () => {},
	signOut: () => {},
	checkingAuth: () => {},
});

export const AuthRef = React.createRef<AuthContextActions>();

export const useAuth = (): AuthContextType => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be inside an AuthProvider with a value');
	}
	return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(AuthReducer, authInitState);
	const { setUser } = useUser();

	React.useEffect(() => {
		const initState = async () => {
			try {
				dispatch({ type: 'CHECKING_AUTH' });
				const userToken = await getToken();

				const { exp } = decodeToken(userToken);

				if (userToken) {
					if (exp && Date.now() >= exp * 1000) {
						authActions.signOut();
					}
					authActions.signIn(userToken);
				} else {
					authActions.signOut();
				}
			} catch (e) {
				authActions.signOut();
			}
		};
		initState();
	}, []);

	React.useImperativeHandle(AuthRef, () => authActions);

	const authActions: AuthContextActions = React.useMemo(
		() => ({
			signIn: async (token: string) => {
				await setToken(token);
				dispatch({ type: 'SIGN_IN', token });
			},
			signOut: async () => {
				await removeToken();
				dispatch({ type: 'SIGN_OUT' });
				// client.clearStore();
			},
			checkingAuth: async () => {
				dispatch({ type: 'CHECKING_AUTH' });
			},
		}),
		[]
	);
	return (
		<AuthContext.Provider value={{ ...state, ...authActions }}>
			{children}
		</AuthContext.Provider>
	);
};
