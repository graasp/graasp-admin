import React from 'react';
import { List } from 'immutable';
import membersData from '../../data/membersData';
import Members from '../members/Members';

const MembersView = () => {
  return <Members title="All Members" items={List(membersData)} />;
};

export default MembersView;
