import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { PeopleOutline } from '@material-ui/icons';
import ReusableTable from '../common/ReusableTable';
import { organizationsHeadCells } from '../../config/constants';

const Organizations = ({ organizations, title, id, elementType }) => {
  const headCells = organizationsHeadCells;

  return (
    <>
      <ReusableTable
        id={id}
        rows={organizations}
        tableTitle={title}
        icon={<PeopleOutline />}
        elementType={elementType}
        headCells={headCells}
      />
    </>
  );
};

Organizations.propTypes = {
  organizations: PropTypes.instanceOf(List).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  elementType: PropTypes.string,
};

Organizations.defaultProps = {
  id: null,
  elementType: '',
};

export default Organizations;
