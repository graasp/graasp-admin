import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { ReactComponent as GraaspLogo } from '../../resources/graasp-logo.svg';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerLeft: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: '48px',
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <header>
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <div className={classes.headerLeft}>
            <GraaspLogo className={classes.logo} />
            <Typography variant="h6" color="inherit">
              Graasp-Admin
            </Typography>
          </div>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
