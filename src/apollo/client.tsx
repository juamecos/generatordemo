import { ApolloClient, from } from '@apollo/client';
import { authLink } from './links/authLink';
import { errorLink } from './links/errorLink';
import { httpLink } from './links/httpLink';
import cache from './cache';

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
const client = new ApolloClient({
	// The `from` function combines an array of individual links
	// into a link chain
	link: from([errorLink, authLink, httpLink]),
	cache,
});

export default client;
