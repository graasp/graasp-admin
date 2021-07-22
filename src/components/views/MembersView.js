import React from 'react';
import { Loader } from '@graasp/ui';
import Members from '../members/Members';
import { hooks } from '../../config/queryClient';

const { useAllMembers } = hooks;

const MembersView = () => {
  const { data: allMembers, isLoading } = useAllMembers();

  if (isLoading) {
    return <Loader />;
  }
  return <Members title="All Members" members={allMembers} />;
};

export default MembersView;
