import React from 'react';

import AccountCircleIcon from '@mui/icons-material//AccountCircle';

import { Loader } from '@graasp/ui';

import { TABLE_TYPES, adminsHeadCell } from '../../config/constants';
import { useAdmins } from '../../config/mock';
import { buildAdminPath } from '../../config/paths';
import CustomTable from '../common/CustomTable';

const AdminsView = () => {
  const { data: allMember, isLoading } = useAdmins();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <CustomTable
      link={buildAdminPath}
      tableType={TABLE_TYPES.MEMBER}
      headCells={adminsHeadCell}
      tableTitle="All Admins"
      rows={allMember}
      checkBox
      empty
      icon={<AccountCircleIcon />}
      iconCell="name"
      arrayCell="roles"
    />
  );
};

export default AdminsView;
