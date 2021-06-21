import React from 'react';
import { List } from 'immutable';
import { withRouter } from 'react-router';
import MembersHeader from '../members/header/membersHeader';
import membersData from '../../data/membersData';
import Members from '../members/Members';

const Home = () => {
  return (
    <>
      <MembersHeader />
      <Members id="All Members" title="All Members" items={List(membersData)} />
    </>
  );
};

export default withRouter(Home);
