import { useQuery } from 'react-query';
import { List, Map } from 'immutable';
import * as Api from '../api';
import {
  ALL_ITEMS_KEY,
  buildItemChildrenKey,
  buildItemKey,
  buildItemParentsKey,
  buildMemberItemsKey,
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
      onSuccess: (item) => {
        // save items in their own key
        // eslint-disable-next-line no-unused-expressions
        queryClient.setQueryData(buildItemKey(id), Map(item));
      },
      ...defaultOptions,
    });

  const useAllItems = () =>
    useQuery({
      queryKey: ALL_ITEMS_KEY,
      queryFn: () => Api.getAllItems(queryConfig).then((data) => List(data)),
      onSuccess: (items) => {
        // save items in their own key
        // eslint-disable-next-line no-unused-expressions
        items?.forEach((item) => {
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
      onSuccess: (items) => {
        items.forEach((item) => {
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
      onSuccess: (items) => {
        items.forEach((item) => {
          const { id } = item;
          queryClient.setQueryData(buildItemKey(id), Map(item));
        });
      },
      ...defaultOptions,
      enabled: Boolean(itemId) && options?.enabled,
    });

  const useMemberItems = (memberId) =>
    useQuery({
      queryKey: buildMemberItemsKey(memberId),
      queryFn: () =>
        Api.getItemsOfMember({ id: memberId }, queryConfig).then((data) =>
          List(data),
        ),
      onSuccess: (items) => {
        // save items in their own key
        // eslint-disable-next-line no-unused-expressions
        items?.forEach((item) => {
          const { id } = item;
          queryClient.setQueryData(buildItemKey(id), Map(item));
        });
      },
      ...defaultOptions,
    });
  return { useItem, useAllItems, useChildren, useMemberItems, useParents };
};
