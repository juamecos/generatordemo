import { onError } from '@apollo/client/link/error';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			);
		});
	if (
		networkError &&
		'statusCode' in networkError &&
		networkError.statusCode === 401
	) {
		console.log(networkError.statusCode, '401');
	}

	if (networkError)
		console.log(
			`[Network error-]: ${networkError.name} - ${networkError.message} - ${networkError.stack}`
		);
});
