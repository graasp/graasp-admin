import React from 'react';
import { List } from 'immutable';
import Items from '../items/Items';
import { hooks } from '../../config/queryClient';

const { useAllItems } = hooks;

const ItemsView = () => {
  const { data: allItems, isLoading } = useAllItems();

  return <>{!isLoading && <Items title="All Items" items={allItems} />}</>;
};

export default ItemsView;
