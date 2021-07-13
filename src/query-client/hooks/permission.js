import { useQuery } from 'react-query';
import { List, Map } from 'immutable';
import {
  buildPermissionKey,
  buildRolePermissionKey,
  buildRolesPermissionsKey,
} from '../config/keys';
import * as Api from '../api';

export default (queryClient, queryConfig) => {
  const { retry, cacheTime, staleTime } = queryConfig;
  const defaultOptions = {
    retry,
    cacheTime,
    staleTime,
  };
  const useRolePermissions = (roleId) =>
    useQuery({
      queryKey: buildRolePermissionKey(roleId),
      queryFn: () =>
        Api.getRolePermissions({ id: roleId }, queryConfig).then((data) =>
          List(data),
        ),
      onSuccess: async (permissions) => {
        // save items in their own key
        // eslint-disable-next-line no-unused-expressions
        permissions?.forEach(async (permission) => {
          const { id } = permission;
          queryClient.setQueryData(buildPermissionKey(id), Map(permission));
        });
      },
      ...defaultOptions,
      enabled: Boolean(roleId),
    });

  const useRolesPermissions = (roleIds) =>
    useQuery({
      queryKey: buildRolesPermissionsKey(roleIds),
      queryFn: () =>
        Api.getRolesPermissions({ ids: roleIds }, queryConfig).then((data) =>
          List(data),
        ),

      onSuccess: async (permissions) => {
        // save items in their own key
        // eslint-disable-next-line no-unused-expressions
        permissions?.forEach(async (permission) => {
          permission.forEach(async (p) => {
            const { id } = p;
            queryClient.setQueryData(buildPermissionKey(id), List(permission));
          });
        });
      },
      ...defaultOptions,
      enabled: Boolean(roleIds),
    });

  return {
    useRolePermissions,
    useRolesPermissions,
  };
};
