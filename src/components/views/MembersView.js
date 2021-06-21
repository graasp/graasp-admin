import React from 'react';
import { List } from 'immutable';
import { withRouter } from 'react-router';
import membersData from '../../data/membersData';
import Members from '../members/Members';

const MembersView = () => {
  return (
    <>
      <Members id="All Members" title="All Members" items={List(membersData)} />
    </>
  );
};

export default withRouter(MembersView);
