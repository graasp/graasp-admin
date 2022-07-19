import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FolderIcon from '@material-ui/icons/Folder';
import {
  AccountTree,
  Adjust,
  Apps,
  PeopleOutline,
  SupervisedUserCircle,
} from '@material-ui/icons';

import CardItem from '../common/CardItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  paper: {
    marginTop: '24px',
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(2),
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  gridContainer: {
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
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container className={classes.gridContainer} spacing={3}>
          <Grid item className={classes.gridItem}>
            <CardItem
              itemName="Members"
              icon={<AccountCircleIcon />}
              content={200}
              path="/members"
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <CardItem
              itemName="Admins"
              icon={<SupervisedUserCircle />}
              content={1}
              path="/admins"
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <CardItem
              itemName="Organizations"
              icon={<PeopleOutline />}
              content={10}
              path="/organizations"
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <CardItem
              itemName="Projects"
              icon={<AccountTree />}
              content={10}
              path="/projects"
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <CardItem
              itemName="Collections"
              icon={<Apps />}
              content={1}
              path="/collections"
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <CardItem
              itemName="Items"
              icon={<FolderIcon />}
              content={3000}
              path="/items"
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <CardItem
              itemName="Environments"
              icon={<Adjust />}
              path="/environments"
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default HomeView;
