import { setContext } from '@apollo/client/link/context';

import { getToken, decodeToken } from '../../utils/tokens';

export const authLink = setContext(async (_, { headers }) => {
	// get the authentication token from Async Storage if it exists

	const token = await getToken();
	if (token) {
		// check if it expired
		const { exp } = decodeToken(token);

		if (exp! * 1000 > Date.now()) {
			return {
				headers: {
					...headers,
					Authorization: token,
				},
			};
		}

		console.log('AuthLink token is expired');

		return {
			headers: {
				...headers,
				Authorization: null,
			},
		};
	}
});
