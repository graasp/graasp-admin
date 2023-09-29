import { useState } from 'react';

import { Menu, MenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Loader } from '@graasp/ui';

import truncate from 'lodash';

import { USERNAME_MAX_LENGTH } from '../../config/constants';
import { hooks } from '../../config/queryClient';
import { HEADER_USER_ID } from '../../config/selectors';

const { useCurrentMember } = hooks;

function SettingsHeader() {
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
      <Box onClick={handleClick} id={HEADER_USER_ID}>
        <Tooltip title="Admin">
          <Avatar alt={username} />
        </Tooltip>

        <Typography variant="subtitle1">
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
