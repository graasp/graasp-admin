import React from 'react';

import {  Stack, Typography } from '@mui/material';
import {Main as GraaspMain, GraaspLogo} from '@graasp/ui'

import PropTypes from 'prop-types';

import MainMenu from './MainMenu';
import { Link } from 'react-router-dom';
import { HOME_PATH } from '@/config/paths';
import { APP_NAME } from '@/config/constants';
import SettingsHeader from '../common/SettingsHeader';


const headerLeftContent = (<Stack 
  display={'flex'}
  direction={'row'}
  alignItems={'center'}><Stack>
  <Link to={HOME_PATH}>
    <GraaspLogo
      height={40}
      sx={{
        fill: 'white',
      }}
    />
  </Link>
</Stack>
<Link to={HOME_PATH}>
  <Typography variant="h6" color="inherit">
    {APP_NAME}
  </Typography>
</Link>
</Stack>)

const Main = ({ children }) => {



return(  <GraaspMain open={true} sidebar={<MainMenu />} headerRightContent={<SettingsHeader />} headerLeftContent={headerLeftContent} >{children}</GraaspMain>)

};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
