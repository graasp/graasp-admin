import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from '../../layout/Navigation';
import MembersHeaderActions from './membersHeaderActions';
import { buildMemberPath } from '../../../config/paths';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  buttons: {
    display: 'flex',
  },
}));

const MembersHeader = ({ onClick }) => {
  const match = useRouteMatch(buildMemberPath());
  const memberId = match?.params?.memberId;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation />
      <MembersHeaderActions id={memberId} onClick={onClick} />
    </div>
  );
};

MembersHeader.propTypes = {
  onClick: PropTypes.func,
};

MembersHeader.defaultProps = {
  onClick: () => {},
};

export default MembersHeader;
