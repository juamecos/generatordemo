import React, { createContext, useReducer } from 'react';
import { removeToken } from '../../utils/tokens';
import client from 'src/apollo/client';

export interface UserState {
	__typename?: 'User';
	active: boolean;
	avatar: string;
	bio: string;
	country: string;
	email: string;
	id: string;
	registerDate: string;
	role: string;
	userName: string;
}

export const initialState: UserState = {
	__typename: 'User',
	active: false,
	avatar: '',
	bio: '',
	country: '',
	email: '',
	id: '',
	registerDate: '',
	role: '',
	userName: '',
};

export enum ActionType {
	setUser = 'SET_USER',
	removeUser = 'REMOVE_USER',
}

export interface SetUser {
	type: 'SET_USER';
	payload: UserState;
}

export interface RemoveUser {
	type: 'REMOVE_USER';
}

type UserAction = SetUser | RemoveUser;

interface UserContextActions {
	setUser: <T>(user: UserState) => Promise<void>;
	// updateUser: (data: UserPayload) => void;
	removeUser: () => void;
}

interface UserContextType extends UserState, UserContextActions {}

const UserContext = createContext<UserContextType>({
	__typename: 'User',
	id: '',
	userName: '',
	email: '',
	country: '',
	avatar: '',
	registerDate: '',
	active: false,
	role: '',
	bio: '',
	setUser: async () => {},
	// updateUser: (data: UserPayload) => void;
	removeUser: () => {},
});

export const UserRef = React.createRef<UserContextActions>();

export const useUser = (): UserContextType => {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be inside an UserProvider with a value');
	}
	return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(UserReducer, initialState);

	const userActions: UserContextActions = {
		setUser: async (user: UserState) => {
			dispatch({ type: 'SET_USER', payload: user });
		},
		removeUser: async () => {
			await removeToken();
			client.resetStore();
			dispatch({ type: 'REMOVE_USER' });
		},
	};
	return (
		<UserContext.Provider value={{ ...state, ...userActions }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserReducer = (prevState: UserState, action: UserAction) => {
	switch (action.type) {
		case 'SET_USER':
			return {
				...prevState,
				...action.payload,
			};
		case 'REMOVE_USER':
			return initialState;

		default:
			return prevState;
	}
};
