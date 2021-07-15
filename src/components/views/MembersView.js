import React from 'react';
import { Loader } from '@graasp/ui';
import { hooks } from '../../config/queryClient';
import MembersTable from '../members/MembersTable';

const { useAllMembers } = hooks;

const MembersView = () => {
  const { data: allMembers, isLoading } = useAllMembers();

  if (isLoading) {
    return <Loader />;
  }
  return <MembersTable id="members" title="All Members" members={allMembers} />;
};

export default MembersView;
