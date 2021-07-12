import configureMemberHooks from './member';

export default (queryClient, queryConfig) => ({
  ...configureMemberHooks(queryConfig),
});
