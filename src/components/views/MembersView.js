import React from 'react';
import { Loader } from '@graasp/ui';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { hooks } from '../../config/queryClient';
import { buildMemberPath } from '../../config/paths';
import { memberHeadCell, TABLE_TYPES } from '../../config/constants';
import CustomTable from '../common/CustomTable';

const { useMembers } = hooks;

const MembersView = () => {
  const { data: allMembers, isLoading } = useMembers();

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
