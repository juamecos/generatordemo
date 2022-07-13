import { InMemoryCache } from '@apollo/client';
import { StoneObjectFragmentDoc } from 'src/generated/graphql';

const cache = new InMemoryCache({
	addTypename: true,
	typePolicies: {
		Query: {
			fields: {
				stones: {
					merge(existing, incoming, { mergeObjects }) {
						return mergeObjects(existing, incoming);
					},
				},
				likes: {
					merge(existing, incoming, { mergeObjects }) {
						return mergeObjects(existing, incoming);
					},
				},
				comments: {
					merge(existing, incoming, { mergeObjects }) {
						return mergeObjects(existing, incoming);
					},
				},
			},
		}, //TODO check update cache while pagination and future sorting and filter
		// Mutation: {
		// 	fields: {
		// 		addStone: {
		// 			merge(_, incoming, { cache }) {
		// 				cache.modify({
		// 					fields: {
		// 						stones(existing = []) {
		// 							return [...existing, incoming];
		// 						},
		// 					},
		// 				});
		// 				return incoming;
		// 			},
		// 		},
		// 	},
		// },
		Mutation: {
			fields: {
				addStone: {
					// update(cache, { data: { addStone } }) {
					// 	cache.modify({
					// 		fields: {
					// 			stones(existingStones = []) {
					// 				const newStoneRef = cache.writeFragment({
					// 					data: addStone,
					// 					fragment: StoneObjectFragmentDoc,
					// 				});
					// 				return [newStoneRef, ...existingStones];
					// 			},
					// 		},
					// 	});
					// },
				},
			},
		},
		Comments: {
			fields: {
				comments: {
					merge(existing, incoming, { mergeObjects }) {
						return mergeObjects(existing, incoming);
					},
				},
			},
		},
		Likes: {
			fields: {
				likes: {
					merge(existing, incoming, { mergeObjects }) {
						return mergeObjects(existing, incoming);
					},
				},
			},
		},
	},
});

export default cache;
