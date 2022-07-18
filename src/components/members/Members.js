import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { List } from 'immutable';
import MembersTable from './MembersTable';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  toolbarDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  gridcontainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '24px',
  },
  gridItem: {
    flex: ' 1 0 21%' /* explanation below */,
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  papercard: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Members = ({ members, title, id }) => {
  const classes = useStyles();

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
