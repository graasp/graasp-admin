import React, { useState } from 'react';
import { useRouteMatch } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  Breadcrumbs,
  Button,
  capitalize,
  Grid,
  Link,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Adjust, CheckBox } from '@material-ui/icons';
import { Loader } from '@graasp/ui';
import { hooks } from '../../config/queryClient';
import { buildEnvironmentPath } from '../../config/paths';
import VersionsTable from './VersionsTable';
import DeleteCollectionDialog from '../main/DeleteCollectionDialog';

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

const { useGetDataFromApi } = hooks;

const SingleEnvironment = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const classes = useStyles();
  const match = useRouteMatch(buildEnvironmentPath());
  const environmentName = match?.params?.environmentName;
  const { data, status } = useGetDataFromApi(environmentName);

  const handleClickOpen = () => {
    console.log(open);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.toolbarDiv}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/environments"
              className={classes.link}
            >
              <Adjust sx={{ mr: 0.5 }} fontSize="inherit" />
              Environments
            </Link>
            <Typography className={classes.title} component="div">
              {capitalize(environmentName)}
            </Typography>
          </Breadcrumbs>
          <>
            <Tooltip placement="left" title={t('Create new element')} arrow>
              <Button
                className={classes.createNewButton}
                onClick={handleClickOpen}
              >
                <CheckBox />
                New deployment
              </Button>
            </Tooltip>
            <DeleteCollectionDialog
              open={open}
              setOpen={setOpen}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
            />
          </>
        </div>
        <Grid container className={classes.gridContainer} spacing={3}>
          {status === 'loading' && <Loader />}
          {status === 'error' && <div>Error fetching data</div>}
          {status === 'success' && <VersionsTable versions={data} />}
        </Grid>
      </Paper>
    </div>
  );
};

export default SingleEnvironment;
