import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
// import { makeStyles, Toolbar, Typography } from '@material-ui/core';
import { PeopleOutline } from '@material-ui/icons';
import ReusableTable from '../common/ReusableTable';
// import NewElementButton from '../main/NewElementButton';

// const useStyles = makeStyles(() => ({}));

const Organizations = ({ organizations, title, id, elementType }) => {
  // const classes = useStyles();

  return (
    <>
      <ReusableTable
        id={id}
        rows={organizations}
        tableTitle={title}
        icon={<PeopleOutline />}
        elementType={elementType}
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
