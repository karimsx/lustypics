import {ApolloClient, ApolloClientOptions, createHttpLink, InMemoryCache, NormalizedCacheObject} from '@apollo/client/core';
import {setContext} from '@apollo/client/link/context';
import 'cross-fetch/polyfill';


export const getGraphqlClient = (opts: {
  uri: string,
  authToken?: string,
  clientOpts?: ApolloClientOptions<NormalizedCacheObject>
}): ApolloClient<NormalizedCacheObject> => {

  const httpLink = createHttpLink({
    uri: opts.uri
  });

  const authLink = setContext((_, {headers}) => {

    const token = opts.authToken || ( typeof window !== "undefined" && localStorage?.getItem?.('accessToken'))

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),

    ...(opts.clientOpts || {})
  });
}
