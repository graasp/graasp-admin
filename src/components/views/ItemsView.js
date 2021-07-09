import React from 'react';
import { List } from 'immutable';
import Items from '../items/Items';
import itemData from '../../data/itemData';
import membersData from '../../data/membersData';

const getOwner = (itemOwnerId) => {
  return membersData.find(({ id }) => itemOwnerId === id);
};

// Will be removed later
const insertCreatorWithItems = (items) =>
  items.map((item) => {
    return {
      ...item,
      owner: getOwner(item.creator).name,
    };
  });

const ItemsView = () => {
  // Will be removed later
  const itemsWithCreators = insertCreatorWithItems(itemData);

  return <Items title="All Items" items={List(itemsWithCreators)} />;
};

export default ItemsView;
