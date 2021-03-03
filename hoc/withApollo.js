import withApollo from 'next-with-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'

export default withApollo(
	({ initialState }) => {
		return new ApolloClient({
			uri: 'https://localhost:7003/graphql',
			cache: new InMemoryCache().restore(initialState || {})
		});
	},
	{
		render: ({ Page, props }) => {
			return (
				<ApolloProvider client={props.apollo}>
					<Page {...props} />
				</ApolloProvider>
			);
		}
	}
);