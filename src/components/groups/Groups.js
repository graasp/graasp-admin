import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import MembersTable from './MembersTable';

const Members = ({ members, title, id }) => {
  return <MembersTable id={id} members={members} tableTitle={title} />;
};

Members.propTypes = {
  members: PropTypes.instanceOf(List).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
};

Members.defaultProps = {
  id: null,
};

export default Members;
