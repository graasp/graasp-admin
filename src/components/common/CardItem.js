import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Paper } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useHistory, useRouteMatch } from 'react-router';
import { buildEnvironmentPath, ENVIRONMENTS_PATH } from '../../config/paths';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  paperCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    borderRadius: '0px',
    padding: '3px',
    '&:hover': {
      color: 'primary',
    },
  },
  boxitem: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const CardItem = ({ itemName, icon, content, path }) => {
  const classes = useStyles();
  const { push } = useHistory();

  // check if route matches /deplyments route
  const match = useRouteMatch(ENVIRONMENTS_PATH);

  const handleClickOpen = () => {
    // only if the card item has a path to redirect
    if (path) {
      // if the path matches /deployment path
      if (match?.isExact) {
        push(buildEnvironmentPath(path));
      }
      push(path.toLowerCase());
    }
  };

  return (
    <IconButton className={classes.iconContainer}>
      <Paper className={classes.paperCard} onClick={() => handleClickOpen()}>
        <Box className={classes.boxitem} p={1} m={1}>
          {itemName}
        </Box>
        <Box className={classes.boxitem} p={1} m={1}>
          {content}
        </Box>
        <Box className={classes.boxitem} p={1} m={1}>
          {icon}
        </Box>
      </Paper>
    </IconButton>
  );
};

CardItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  icon: PropTypes.element,
  content: PropTypes.string,
  path: PropTypes.string.isRequired,
};
CardItem.defaultProps = {
  icon: null,
  content: null,
};

export default CardItem;
