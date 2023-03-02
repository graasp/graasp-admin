import React from 'react';
import { Loader } from '@graasp/ui';
import { buildItemPath } from '../../config/paths';
import { itemHeadCells, TABLE_TYPES } from '../../config/constants';
import CustomTable from '../common/CustomTable';
import ItemIcon from '../items/ItemIcon';
import { useAllItems } from '../../config/mock';

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
