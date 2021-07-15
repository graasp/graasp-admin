import React from 'react';
import { hooks } from '../../config/queryClient';
import Loader from '../common/Loader';
import MembersTable from '../members/MembersTable';

const { useAllAdmins } = hooks;

const AdminsView = () => {
  const { data: allMember, isLoading } = useAllAdmins();

  if (isLoading) {
    return <Loader />;
  }
  return <MembersTable id="members" title="All Members" members={allMember} />;
};

export default AdminsView;
