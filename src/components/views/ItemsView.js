import React from 'react';
import { withRouter } from 'react-router';
import { List } from 'immutable';
// import ItemHeader from '../item/header/ItemHeader';
import Items from '../items/Items';
import itemsData from '../../data/itemsData';
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
  const itemsWithCreators = insertCreatorWithItems(itemsData);

  return (
    <>
      {/* <ItemHeader /> */}
      <Items id="All Items" title="All Items" items={List(itemsWithCreators)} />
    </>
  );
};

export default withRouter(ItemsView);
