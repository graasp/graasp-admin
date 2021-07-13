import configureMemberHooks from './member';
import configureItemHooks from './item';

export default (queryClient, queryConfig) => ({
  ...configureMemberHooks(queryClient, queryConfig),
  ...configureItemHooks(queryClient, queryConfig),
});
