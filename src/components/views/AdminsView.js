import React from 'react';
import { useTranslation } from 'react-i18next';
import { mockAdmins } from '../../config/constants';
// import { hooks } from '../../config/queryClient';
// import Loader from '../common/Loader';
import Admins from '../admins/Admins';

// const { useAllAdmins } = hooks;

const AdminsView = () => {
  // const { data: allMember, isLoading } = useAllAdmins();
  const { t } = useTranslation();
  const admins = mockAdmins;
  // if (isLoading) {
  //   return <Loader />;
  // }
  return <Admins title={t('All Admins')} admins={admins} elementType="admin" />;
};

export default AdminsView;
