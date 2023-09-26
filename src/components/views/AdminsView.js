import React from 'react';
import AccountCircleIcon from '@mui/icons-material//AccountCircle';
import { buildAdminPath } from '../../config/paths';
import { adminsHeadCell, TABLE_TYPES } from '../../config/constants';
import CustomTable from '../common/CustomTable';
import { useAdmins } from '../../config/mock';
import { Loader } from '@graasp/ui';

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
