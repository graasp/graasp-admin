import { Loader } from '@graasp/ui';
import {
  Breadcrumbs,
  capitalize,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Adjust } from '@material-ui/icons';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { buildVersionsFilePath } from '../../config/paths';
import { hooks } from '../../config/queryClient';
import { buildGetStackVersionsRoute } from '../../query-client/api/routes';
import VersionsTable from './VersionsTable';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  toolbarDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '24px',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

const { useGetJsonFromApi } = hooks;

const SingleStack = () => {
  const classes = useStyles();
  const match = useRouteMatch(buildVersionsFilePath());
  const environmentName = match?.params?.environmentName;
  const stackName = match?.params?.stackName;
  const { data, status } = useGetJsonFromApi(
    buildGetStackVersionsRoute(environmentName, stackName),
  );
  const environmentPath = `/environments/${environmentName}`;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.toolbarDiv}>
          <Breadcrumbs aria-label="breadcrumb-stack">
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              to="/environments"
              className={classes.link}
            >
              <Adjust sx={{ mr: 0.5 }} fontSize="inherit" />
              Environments
            </Link>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              to={environmentPath}
              className={classes.link}
            >
              {capitalize(environmentName)}
            </Link>
            <Typography className={classes.title} component="div">
              {capitalize(stackName)}
            </Typography>
          </Breadcrumbs>
        </div>
        <Grid container className={classes.gridContainer} spacing={3}>
          <Grid item className={classes.gridItem}>
            <Typography variant="h6">Stack versions</Typography>
            {status === 'loading' && <Loader />}
            {status === 'error' && <div>Error fetching data</div>}
            {status === 'success' && <VersionsTable versions={data} />}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default SingleStack;
