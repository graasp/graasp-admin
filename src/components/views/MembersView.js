import React from 'react';
import Members from '../members/Members';
import { hooks } from '../../config/queryClient';
import Loader from '../common/Loader';

const { useAllMembers } = hooks;

const MembersView = () => {
  const { data: allMember, isLoading } = useAllMembers();

  if (isLoading) {
    return <Loader />;
  }
  return <Members title="All Members" members={allMember} />;
};

export default MembersView;
