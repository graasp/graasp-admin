import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { hooks } from '../../config/queryClient';
import Loader from '../common/Loader';
import MembersTable from '../members/MembersTable';
import { buildAdminPath, buildMemberPath } from '../../config/paths';
import {
  adminsHeadCell,
  memberHeadCell,
  TABLE_TYPES,
} from '../../config/constants';
import CustomTable from '../common/CustomTable';

const { useAllAdmins } = hooks;

const AdminsView = () => {
  const { data: allMember, isLoading } = useAllAdmins();

  console.log(allMember);
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
