import React from 'react';
import { Loader } from '@graasp/ui';
import Items from '../items/Items';
import { hooks } from '../../config/queryClient';

const { useAllItems } = hooks;

const ItemsView = () => {
  const { data: allItems, isLoading } = useAllItems();

  if (isLoading) {
    return <Loader />;
  }
  return <Items title="All Items" items={allItems} />;
};

export default ItemsView;
