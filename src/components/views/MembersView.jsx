import React from 'react';

import AccountCircleIcon from '@mui/icons-material//AccountCircle';

import { Loader } from '@graasp/ui';

import { TABLE_TYPES, memberHeadCell } from '../../config/constants';
import { useAllMembers } from '../../config/mock';
import { buildMemberPath } from '../../config/paths';
import CustomTable from '../common/CustomTable';

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
