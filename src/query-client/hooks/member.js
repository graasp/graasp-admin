import { useQuery } from 'react-query';
import { List, Map } from 'immutable';
import * as Api from '../api';
import {
  ALL_ADMINS_KEY,
  ALL_MEMBERS_KEY,
  buildMemberKey,
  CURRENT_MEMBER_KEY,
} from '../config/keys';

export default (queryClient, queryConfig) => {
  const { retry, cacheTime, staleTime } = queryConfig;
  const defaultOptions = {
    retry,
    cacheTime,
    staleTime,
  };

  const useCurrentMember = () =>
    useQuery({
      queryKey: CURRENT_MEMBER_KEY,
      queryFn: () =>
        Api.getCurrentMember(queryConfig).then((data) => Map(data)),
      ...defaultOptions,
    });

  const useMember = (id) =>
    useQuery({
      queryKey: buildMemberKey(id),
      queryFn: () =>
        Api.getMember({ id }, queryConfig).then((data) => Map(data)),
      enabled: Boolean(id),
      ...defaultOptions,
    });

  const useAllMembers = () =>
    useQuery({
      queryKey: ALL_MEMBERS_KEY,
      queryFn: () => Api.getAllMembers(queryConfig).then((data) => List(data)),
      onSuccess: async (members) => {
        // save items in their own key
        // eslint-disable-next-line no-unused-expressions
        members?.forEach(async (member) => {
          const { id } = member;
          queryClient.setQueryData(buildMemberKey(id), Map(member));
        });
      },
      ...defaultOptions,
    });

  const useAllAdmins = () =>
    useQuery({
      queryKey: ALL_ADMINS_KEY,
      queryFn: () => Api.getAdmins(queryConfig).then((data) => List(data)),
      onSuccess: async (members) => {
        // save items in their own key
        // eslint-disable-next-line no-unused-expressions
        members?.forEach(async (member) => {
          const { id } = member;
          queryClient.setQueryData(buildMemberKey(id), Map(member));
        });
      },
      ...defaultOptions,
    });

  return { useCurrentMember, useMember, useAllMembers, useAllAdmins };
};
