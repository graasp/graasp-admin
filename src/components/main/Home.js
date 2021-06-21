import React from 'react';

import { withRouter } from 'react-router';
import MembersHeader from '../members/header/membersHeader';
import { membersData } from '../../data/membersData';
import Members from '../members/members';

const Home = () => {
  return (
    <>
      <MembersHeader />
      <Members id={'All Members'} title={'All Members'} items={membersData} />
    </>
  );
};

// Home.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({ itemId: PropTypes.string }).isRequired,
//   }).isRequired,
// };

export default withRouter(Home);
