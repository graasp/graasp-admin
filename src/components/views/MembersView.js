import React from 'react';
import { List } from 'immutable';
import membersData from '../../data/membersData';
import Members from '../members/Members';
import { hooks } from '../../config/queryClient';

const { useCurrentMember } = hooks;

const MembersView = () => {
  const { data: currentMember } = useCurrentMember();

  console.log(currentMember);
  return <Members title="All Members" items={List(membersData)} />;
};

export default MembersView;
