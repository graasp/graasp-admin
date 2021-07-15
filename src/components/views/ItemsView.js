import React from 'react';
import Items from '../items/Items';
import { hooks } from '../../config/queryClient';
import Loader from '../common/Loader';

const { useAllItems } = hooks;

const ItemsView = () => {
  const { data: allItems, isLoading } = useAllItems();

  if (isLoading) {
    return <Loader />;
  }
  return <Items title="All Items" items={allItems} />;
};

export default ItemsView;
