import {ApolloClient, ApolloClientOptions, createHttpLink, InMemoryCache, NormalizedCacheObject} from '@apollo/client/core';
import 'cross-fetch/polyfill';
import {GraphQLClient} from "graphql-request";


export const getGraphqlRequestClient = (opts: {
  uri: string,
}): GraphQLClient => {

  const graphQLClient = new GraphQLClient(opts.uri)


  return graphQLClient;
}
