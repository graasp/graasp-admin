import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
// import { makeStyles, Toolbar, Typography } from '@material-ui/core';
import { SupervisedUserCircle } from '@material-ui/icons';
import ReusableTable from '../common/ReusableTable';
// import NewElementButton from '../main/NewElementButton';

// const useStyles = makeStyles(() => ({}));

const Admins = ({ admins, title, id, elementType }) => {
  // const classes = useStyles();

  return (
    <>
      <ReusableTable
        id={id}
        rows={admins}
        tableTitle={title}
        icon={<SupervisedUserCircle />}
        elementType={elementType}
      />
    </>
  );
};

Admins.propTypes = {
  admins: PropTypes.instanceOf(List).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  elementType: PropTypes.string,
};

Admins.defaultProps = {
  id: null,
  elementType: '',
};

export default Admins;
