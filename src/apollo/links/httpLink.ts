import { HttpLink } from '@apollo/client';
// TODO uri in .env
export const httpLink = new HttpLink({
	uri: 'http://10.0.2.2:2002/graphql',
	credentials: 'include',
});
