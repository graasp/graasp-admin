import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { BookmarkBorderOutlined, DoneAll } from '@material-ui/icons';

import CardItem from '../common/CardItem';

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

const EnvironmentsView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.toolbarDiv}>
          <Typography className={classes.title} variant="h6" component="div">
            All environments
          </Typography>
        </div>
        <Grid container className={classes.gridcontainer} spacing={3}>
          <Grid item className={classes.gridItem}>
            <CardItem
              itemName="Staging"
              icon={<BookmarkBorderOutlined />}
              content={10}
              path="staging"
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <CardItem
              itemName="Production"
              icon={<DoneAll />}
              content={1}
              path="production"
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default EnvironmentsView;
