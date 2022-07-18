import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useTranslation } from 'react-i18next';
import { hooks } from '../../config/queryClient';
import Loader from '../common/Loader';
import { buildAdminPath } from '../../config/paths';
import { adminsHeadCell, TABLE_TYPES } from '../../config/constants';
import CustomTable from '../common/CustomTable';
import Admins from '../admins/Admins';

const { useAllAdmins } = hooks;

const AdminsView = () => {
  const { data: allMember, isLoading } = useAllAdmins();
  const { t } = useTranslation();

  const admins = [
    {
      id: '1234',
      name: 'HUB4S',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'HUN4S@graasp.org',
    },
    {
      id: '1235',
      name: 'GRAASP',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'graasp@graasp.org',
    },
  ];
  if (isLoading) {
    return <Loader />;
  }
  // return (
  // <CustomTable
  //   link={buildAdminPath}
  //   tableType={TABLE_TYPES.MEMBER}
  //   headCells={adminsHeadCell}
  //   tableTitle="All Admins"
  //   rows={allMember}
  //   checkBox
  //   empty
  //   icon={<AccountCircleIcon />}
  //   iconCell="name"
  //   arrayCell="roles"
  // />
  // );
  return <Admins title={t('All Admins')} admins={admins} elementType="admin" />;
};

export default AdminsView;
