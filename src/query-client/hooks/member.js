import { useQuery } from 'react-query';
import { Map } from 'immutable';
import * as Api from '../api';
import {
  ALL_MEMBER_KEY,
  buildMemberKey,
  CURRENT_MEMBER_KEY,
} from '../config/keys';

export default (queryConfig) => {
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
      queryKey: ALL_MEMBER_KEY,
      queryFn: () => Api.getAllMembers(queryConfig).then((data) => Map(data)),
      ...defaultOptions,
    });

  const useAllAdmins = () =>
    useQuery({
      queryKey: ALL_MEMBER_KEY,
      queryFn: () => Api.getAdmins(queryConfig).then((data) => Map(data)),
      ...defaultOptions,
    });

  return { useCurrentMember, useMember, useAllMembers, useAllAdmins };
};
