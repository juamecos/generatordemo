import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode, { JwtPayload } from 'jwt-decode';

type UserPayload = {
	user: { id: number };
};

type ExtendedJwtPayload = JwtPayload & UserPayload;

export const decodeToken = (token: string) => {
	return jwt_decode<ExtendedJwtPayload>(token);
};

export const isTokenValid = (token: string | null | undefined) => {
	if (token) {
		const { exp } = decodeToken(token);
		const now = Date.now();
		if (exp && now >= exp * 1000) {
			return false;
		}
		return true;
	}
	return false;
};

const TOKEN_NAME = 'token';

export const getToken = async () => {
	try {
		const value = await AsyncStorage.getItem(TOKEN_NAME);
		if (value !== null) {
			return value;
		}
		return null;
	} catch (e) {
		console.log(e);
	}
};

export const setToken = async (value: string) => {
	try {
		await AsyncStorage.setItem(TOKEN_NAME, value);
	} catch (e) {
		console.log(e);
	}
};

export const removeToken = async () => {
	try {
		await AsyncStorage.removeItem(TOKEN_NAME);
	} catch (error) {}
};
