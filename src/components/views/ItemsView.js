import React from 'react';
import { Loader } from '@graasp/ui';
import { hooks } from '../../config/queryClient';
import ItemsTable from '../items/ItemsTable';

const { useAllItems } = hooks;

const ItemsView = () => {
  const { data: allItems, isLoading } = useAllItems();

  if (isLoading) {
    return <Loader />;
  }
  return <ItemsTable title="All Items" items={allItems} />;
};

export default ItemsView;
