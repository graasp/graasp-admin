import { useQuery } from 'react-query';
import { List, Map } from 'immutable';
import * as Api from '../api';
import {
  ALL_ITEMS_KEY,
  buildItemChildrenKey,
  buildItemKey,
  buildItemMembersKey,
  buildItemParentsKey,
  buildMemberKey,
} from '../config/keys';

export default (queryClient, queryConfig) => {
  const { retry, cacheTime, staleTime } = queryConfig;
  const defaultOptions = {
    retry,
    cacheTime,
    staleTime,
  };

  const useItem = (id) =>
    useQuery({
      queryKey: buildItemKey(id),
      queryFn: () => Api.getItem({ id }, queryConfig).then((data) => Map(data)),
      enabled: Boolean(id),
      ...defaultOptions,
    });

  const useAllItems = () =>
    useQuery({
      queryKey: ALL_ITEMS_KEY,
      queryFn: () => Api.getAllItems(queryConfig).then((data) => List(data)),
      onSuccess: async (items) => {
        // save items in their own key
        // eslint-disable-next-line no-unused-expressions
        items?.forEach(async (item) => {
          const { id } = item;
          queryClient.setQueryData(buildItemKey(id), Map(item));
        });
      },
      ...defaultOptions,
    });

  const useChildren = (itemId, options = {}) =>
    useQuery({
      queryKey: buildItemChildrenKey(itemId),
      queryFn: () =>
        Api.getChildren({ id: itemId }, queryConfig).then((data) => List(data)),
      onSuccess: async (items) => {
        items.forEach(async (item) => {
          const { id } = item;
          queryClient.setQueryData(buildItemKey(id), Map(item));
        });
      },
      ...defaultOptions,
      enabled: Boolean(itemId) && options?.enabled,
    });

  const useParents = (itemId, options = {}) =>
    useQuery({
      queryKey: buildItemParentsKey(itemId),
      queryFn: () =>
        Api.getParents({ id: itemId }, queryConfig).then((data) => List(data)),
      onSuccess: async (items) => {
        items.forEach(async (item) => {
          const { id } = item;
          queryClient.setQueryData(buildItemKey(id), Map(item));
        });
      },
      ...defaultOptions,
      enabled: Boolean(itemId) && options?.enabled,
    });

  const useItemMembers = (itemId) =>
    useQuery({
      queryKey: buildItemMembersKey(itemId),
      queryFn: () =>
        Api.getMembersOfItem({ id: itemId }, queryConfig).then((data) =>
          List(data),
        ),
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
  return { useItem, useAllItems, useChildren, useItemMembers, useParents };
};
