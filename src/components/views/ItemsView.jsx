import React from 'react';

import { ItemIcon, Loader } from '@graasp/ui';

import { TABLE_TYPES, itemHeadCells } from '../../config/constants';
import { useAllItems } from '../../config/mock';
import { buildItemPath } from '../../config/paths';
import CustomTable from '../common/CustomTable';

const ItemsView = () => {
  const { data: allItems, isLoading } = useAllItems();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <CustomTable
      link={buildItemPath}
      tableType={TABLE_TYPES.ITEM}
      headCells={itemHeadCells}
      tableTitle="All Items"
      rows={allItems}
      checkBox
      empty
      icon={<ItemIcon />}
      iconCell="name"
      iconInfo={['name', 'extra', 'type']}
      search
      title
    />
  );
};

export default ItemsView;
