import React from 'react';
import { Loader } from '@graasp/ui';
import AccountCircleIcon from '@mui/icons-material//AccountCircle';
import { buildMemberPath } from '../../config/paths';
import { memberHeadCell, TABLE_TYPES } from '../../config/constants';
import CustomTable from '../common/CustomTable';
import { useAllMembers } from '../../config/mock';

const MembersView = () => {
  const { data: allMembers, isLoading } = useAllMembers();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <CustomTable
      link={buildMemberPath}
      tableType={TABLE_TYPES.MEMBER}
      headCells={memberHeadCell}
      tableTitle="All Members"
      rows={allMembers}
      checkBox
      empty
      icon={<AccountCircleIcon />}
      iconCell="name"
      search
      title
    />
  );
};

export default MembersView;
