import { Loader } from '@graasp/ui';

import { TABLE_TYPES, memberHeadCell } from '../../config/constants';
import { useAllMembers } from '../../config/mock';
import { buildMemberPath } from '../../config/paths';
import CustomTable from '../common/CustomTable';

const MembersView = (): JSX.Element => {
  const { data: allMembers, isLoading } = useAllMembers();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <CustomTable
      buildItemLink={buildMemberPath}
      tableType={TABLE_TYPES.MEMBER}
      headCells={memberHeadCell}
      tableTitle="All Members"
      rows={allMembers}
      checkBox
      isEmpty
      // icon={<AccountCircleIcon />}
      // iconCell="name"
      search
      hasTitle
    />
  );
};

export default MembersView;
