import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  CACHE_TIME_MILLISECONDS,
  STALE_TIME_MILLISECONDS,
} from './config/constants';
import configureHooks from './hooks';

// Query client retry function decides when and how many times a request should be retried
const retry = (failureCount, error) => {
  // do not retry if the request was not authorized
  // the user is probably not signed in
  if (error.name === getReasonPhrase(StatusCodes.UNAUTHORIZED)) {
    return 0;
  }
  return failureCount;
};

export default (config) => {
  const baseConfig = {
    API_HOST:
      config?.API_HOST ||
      process.env.REACT_APP_API_HOST ||
      'http://localhost:3111',
  };

  console.log(baseConfig);
  // define config for query client
  const queryConfig = {
    ...baseConfig,
    // derive WS_HOST from API_HOST if needed
    // time until data in cache considered stale if cache not invalidated
    staleTime: STALE_TIME_MILLISECONDS,
    // time before cache labeled as inactive to be garbage collected
    cacheTime: CACHE_TIME_MILLISECONDS,
    retry,
  };

  // create queryClient with given config
  const queryClient = new QueryClient();

  // set up mutations given config
  // mutations are attached to queryClient
  // configureMutations(queryClient, queryConfig);

  // set up hooks given config
  const hooks = configureHooks(queryClient, queryConfig);

  // returns the queryClient and relative instances
  return {
    queryClient,
    QueryClientProvider,
    hooks,
    // useMutation,
    ReactQueryDevtools,
  };
};
