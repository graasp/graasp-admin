import React from 'react';
import Members from '../members/Members';
import { hooks } from '../../config/queryClient';

const { useAllMembers } = hooks;

const MembersView = () => {
  const { data: allMember, isLoading } = useAllMembers();

  return (
    <>{!isLoading && <Members title="All Members" members={allMember} />}</>
  );
};

export default MembersView;
