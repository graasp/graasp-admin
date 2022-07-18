import React from 'react';
import { useTranslation } from 'react-i18next';
// import { hooks } from '../../config/queryClient';
// import Loader from '../common/Loader';
import Admins from '../admins/Admins';

// const { useAllAdmins } = hooks;

const AdminsView = () => {
  // const { data: allMember, isLoading } = useAllAdmins();
  const { t } = useTranslation();

  const mockAdmins = [
    {
      id: '1234',
      name: 'admin1',
      roles: 'admin',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'HUN4S@graasp.org',
      type: 'individual',
    },
    {
      id: '12345',
      name: 'admin2',
      roles: 'admin',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'HUN4S@graasp.org',
      type: 'individual',
    },
  ];
  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <Admins title={t('All Admins')} admins={mockAdmins} elementType="admin" />
  );
};

export default AdminsView;
