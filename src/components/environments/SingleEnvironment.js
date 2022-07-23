import React from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Adjust, CheckBox } from '@material-ui/icons';
import { Loader } from '@graasp/ui';
import { hooks } from '../../config/queryClient';
import { buildEnvironmentPath } from '../../config/paths';
import VersionsTable from './VersionsTable';
import {
  buildGetDeployedVersionsRoute,
  buildGetVersionsFilesRoute,
} from '../../query-client/api/routes';
import { versionsFileHeadCells } from '../../config/constants';
import CustomTableHead from '../common/CustomTableHead';
import ViewElementButton from '../common/ViewElementButton';

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

const { useGetJsonFromApi, useGetDataFromApi } = hooks;

const SingleEnvironment = () => {
  // const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const classes = useStyles();
  const match = useRouteMatch(buildEnvironmentPath());
  const environmentName = match?.params?.environmentName;
  const { data: versionsData, status } = useGetJsonFromApi(
    buildGetDeployedVersionsRoute(environmentName),
  );
  const { data: stagingData, status: stagingStatus } = useGetDataFromApi(
    buildGetVersionsFilesRoute(environmentName),
  );

  // const handleClickOpen = () => {
  //   // setOpen(true);
  // };
  // const handleClose = () => {
  //   // setOpen(false);
  // };

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
                // onClick={handleClickOpen}
              >
                <CheckBox />
                New deployment
              </Button>
            </Tooltip>
          </>
        </div>
        <Grid container className={classes.gridContainer} spacing={3}>
          <Grid item className={classes.gridItem}>
            <Typography variant="h6">Deployed versions</Typography>

            {status === 'loading' && <Loader />}
            {status === 'error' && <div>Error fetching data</div>}
            {status === 'success' && <VersionsTable versions={versionsData} />}
          </Grid>
          <Grid item className={classes.gridItem}>
            <Typography variant="h6">Available stacks</Typography>
            {stagingStatus === 'loading' && <Loader />}
            {stagingStatus === 'error' && <div>Error fetching data</div>}
            {stagingStatus === 'success' && (
              <TableContainer>
                <Table
                  aria-labelledby="tableTitle"
                  size="small"
                  aria-label="enhanced table"
                >
                  <CustomTableHead headCells={versionsFileHeadCells} />
                  <TableBody>
                    {stagingData?.map((row) => {
                      return (
                        <TableRow
                          tabIndex={-1}
                          key={row.id}
                          classes={{
                            hover: classes.hover,
                            selected: classes.selected,
                          }}
                        >
                          <TableCell scope="row">{row.name}</TableCell>
                          <TableCell align="right">
                            <ViewElementButton
                              elementType={environmentName}
                              data={row}
                              key="view"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default SingleEnvironment;
