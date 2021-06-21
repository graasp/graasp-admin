import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';

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
const MembersHeaderActions = ({ onClick, id }) => {
  const classes = useStyles();
  return (
    <div className={classes.buttons}>
      {id && (
        <IconButton onClick={onClick} color="primary">
          <InfoIcon color="primary" />
        </IconButton>
      )}
    </div>
  );
};

MembersHeaderActions.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
};

MembersHeaderActions.defaultProps = {
  onClick: () => {},
  id: null,
};

export default MembersHeaderActions;
