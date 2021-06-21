import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import truncate from 'lodash.truncate';
import { MenuItem } from '@graasp/ui';
import { Menu } from '@material-ui/core';
import { USERNAME_MAX_LENGTH } from '../../config/constants';
import { HEADER_USER_ID } from '../../config/selectors';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  username: {
    margin: theme.spacing(0, 2),
    maxWidth: 100,
  },
}));

function SettingsHeader() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = () => {
    return (
      <>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Sign Out</MenuItem>
      </>
    );
  };

  return (
    <>
      <Box
        className={classes.wrapper}
        onClick={handleClick}
        id={HEADER_USER_ID}
      >
        <Tooltip title="Admin">
          <Avatar className={classes.avatar} alt="Admin" />
        </Tooltip>

        <Typography variant="subtitle1" className={classes.username}>
          {truncate('Admin', { length: USERNAME_MAX_LENGTH })}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderMenu()}
      </Menu>
    </>
  );
}

export default SettingsHeader;
