import configureMemberHooks from './member';
import configureItemHooks from './item';
import configureRoleHooks from './role';
import configurePermissionHooks from './permission';

export default (queryClient, queryConfig) => ({
  ...configureMemberHooks(queryClient, queryConfig),
  ...configureItemHooks(queryClient, queryConfig),
  ...configureRoleHooks(queryClient, queryConfig),
  ...configurePermissionHooks(queryClient, queryConfig),
});
