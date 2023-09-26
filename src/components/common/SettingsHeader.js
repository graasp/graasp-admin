import React, { useState } from 'react';
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import truncate from 'lodash';
import { Menu, MenuItem } from '@mui/material';
import { Loader } from '@graasp/ui';
import { USERNAME_MAX_LENGTH } from '../../config/constants';
import { HEADER_USER_ID } from '../../config/selectors';
import { hooks } from '../../config/queryClient';

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

const { useCurrentMember } = hooks;

function SettingsHeader() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const { data: currentMember, isLoading } = useCurrentMember();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = () => {
    return <MenuItem>Sign Out</MenuItem>;
  };

  if (isLoading) {
    return <Loader />;
  }

  const username = currentMember?.get('name');

  return (
    <>
      <Box
        className={classes.wrapper}
        onClick={handleClick}
        id={HEADER_USER_ID}
      >
        <Tooltip title="Admin">
          <Avatar className={classes.avatar} alt={username} />
        </Tooltip>

        <Typography variant="subtitle1" className={classes.username}>
          {truncate(username, { length: USERNAME_MAX_LENGTH })}
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
