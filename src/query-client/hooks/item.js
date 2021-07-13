import { useQuery } from 'react-query';
import { List, Map } from 'immutable';
import * as Api from '../api';
import { ALL_ITEMS_KEY, buildItemKey } from '../config/keys';

export default (queryClient, queryConfig) => {
  const { retry, cacheTime, staleTime } = queryConfig;
  const defaultOptions = {
    retry,
    cacheTime,
    staleTime,
  };

  const useItems = (id) =>
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

  return { useItems, useAllItems };
};
