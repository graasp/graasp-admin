import { Loader } from '@graasp/ui';

import { TABLE_TYPES, itemHeadCells } from '../../config/constants';
import { useAllItems } from '../../config/mock';
import { buildItemPath } from '../../config/paths';
import CustomTable from '../common/CustomTable';

const ItemsView = (): JSX.Element => {
  const { data: allItems, isLoading } = useAllItems();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <CustomTable
      buildItemLink={buildItemPath}
      tableType={TABLE_TYPES.ITEM}
      headCells={itemHeadCells}
      tableTitle="All Items"
      rows={allItems}
      checkBox
      isEmpty
      // icon={<ItemIcon />}
      // iconCell="name"
      // iconInfo={['name', 'extra', 'type']}
      search
      hasTitle
    />
  );
};

export default ItemsView;
