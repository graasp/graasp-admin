import { useQuery } from 'react-query';
import { List, Map } from 'immutable';
import {
  buildMemberRoleKey,
  buildRoleKey,
  OWN_ROLES_KEY,
} from '../config/keys';
import * as Api from '../api';

export default (queryClient, queryConfig) => {
  const { retry, cacheTime, staleTime } = queryConfig;
  const defaultOptions = {
    retry,
    cacheTime,
    staleTime,
  };

  const useOwnRoles = () =>
    useQuery({
      queryKey: OWN_ROLES_KEY,
      queryFn: () => Api.getOwnRoles(queryConfig).then((data) => List(data)),
      onSuccess: (roles) => {
        // save items in their own key
        // eslint-disable-next-line no-unused-expressions
        if (roles) {
          roles.forEach((role) => {
            const { id } = role;
            queryClient.setQueryData(buildRoleKey(id), Map(role));
          });
        }
      },
      ...defaultOptions,
    });

  const useMembersRole = (memberId) =>
    useQuery({
      queryKey: buildMemberRoleKey(memberId),
      queryFn: () =>
        Api.getMemberRoles({ id: memberId }, queryConfig).then((data) =>
          List(data),
        ),
      onSuccess: (roles) => {
        // save items in their own key
        // eslint-disable-next-line no-unused-expressions
        if (roles) {
          roles.forEach((role) => {
            const { id } = role;
            queryClient.setQueryData(buildRoleKey(id), Map(role));
          });
        }
      },
      ...defaultOptions,
    });
  return {
    useOwnRoles,
    useMembersRole,
  };
};
