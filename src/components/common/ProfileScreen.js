import React from 'react';
import { useHistory } from 'react-router';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Typography,
  Box,
  Paper,
  CardHeader,
  Grid,
  Divider,
  CardContent,
  Tabs,
  Tab,
  Button,
  CardActions,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { formatDate } from '../../utils/date';
import TabPanel from './TabPanel';
import { buildScrollableTabId } from '../../config/selectors';
import { MEMBERS_PATH } from '../../config/paths';

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
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gridItemTabs: {
    display: 'flex',
    justifyContent: 'center',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  cardHeader: {
    padding: 0,
  },
  icon: {
    fontSize: 150,
    width: '100%',
  },
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: '0px 8px',
    padding: '0px 8px',
    backgroundColor: theme.palette.background.paper,
    '& :nth-child(1)': {
      paddingTop: '0px',
      marginTop: '0px',
    },
  },
  deleteAccountContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

const ProfileScreen = ({ member }) => {
  const classes = useStyles();
  const { push } = useHistory();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleResetPassword() {
    const randomstring = Math.random().toString(36).slice(-8);
    console.log(randomstring);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.toolbarDiv}>
          <CardHeader
            title="Account Settings"
            titleTypographyProps={{ variant: 'h6' }}
            classes={classes.cardHeader}
          />
        </div>
        <Divider />
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} lg={4} className={classes.gridItemTabs}>
            <CardContent>
              <Tabs
                value={value}
                onChange={handleChange}
                scrollButtons="off"
                textColor="primary"
                aria-label="scrollable-prevent-tabs"
                orientation="vertical"
                indicatorColor="primary"
              >
                <Tab label="User profile" id={buildScrollableTabId(0)} />
                <Tab label="User groups" id={buildScrollableTabId(1)} />
                <Tab
                  label="Billing Information"
                  id={buildScrollableTabId(2)}
                  disabled
                />
                <Tab label="Reset Password" id={buildScrollableTabId(3)} />
                <Tab label="Delete Account" id={buildScrollableTabId(4)} />
              </Tabs>
            </CardContent>
          </Grid>
          <Grid item xs={12} lg={8}>
            <TabPanel value={value} index={0}>
              <Box className={classes.mainBox} m={1} p={1}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  p={1}
                  m={1}
                  bgcolor="background.paper"
                >
                  <AccountCircleIcon className={classes.icon} />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  p={1}
                  m={1}
                  bgcolor="background.paper"
                >
                  <Typography>{`Id: ${member.get('id')}`}</Typography>
                  <Typography>{`Name: ${member.get('name')}`}</Typography>
                  <Typography>{`Email: ${member.get('email')}`}</Typography>
                  <Typography>{`Type: ${member.get('type')}`}</Typography>
                  <Typography>
                    {`Created At: ${formatDate(member.get('createdAt'))}`}
                  </Typography>
                  {/* <ReactJson src={member.get('extra')} /> */}
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box className={classes.mainBox} m={1} p={1}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  p={1}
                  m={1}
                  bgcolor="background.paper"
                >
                  <Typography variant="h5">Organizations</Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  p={1}
                  m={1}
                  bgcolor="background.paper"
                >
                  <Typography variant="h5">Projects</Typography>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid
                className={classes.deleteAccountContainer}
                container
                spacing={3}
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography>
                    You are about reset the password for this account.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleResetPassword()}
                  >
                    Reset password
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Grid
                className={classes.deleteAccountContainer}
                container
                spacing={3}
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  display="flex"
                  justifyContent="center"
                >
                  <Typography>
                    You are about deactivate this account.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  display="flex"
                  justifyContent="center"
                >
                  <Button variant="contained" color="primary">
                    Deactivate Account
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </Grid>
        </Grid>
        <Divider />
        <CardActions display="flex" flexDirection="row" alignItems="center">
          <Grid item xs={12} lg={8}>
            <Button
              color="primary"
              onClick={() => {
                push(MEMBERS_PATH);
              }}
            >
              Back
            </Button>
          </Grid>
        </CardActions>
        {/* {!currentRoles.isEmpty() && (
        <Box
          display="flex"
          flexDirection="row"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <ListComponent
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={listTitle}
            className={classes.list}
          >
            {currentRoles.map((role, index) => {
              const permissionsDescription = rolesPermissions
                .get(index)
                .map((p) => p.description);
              return (
                <ExpandableListItem
                  key={role.description}
                  itemName={role.description}
                  content={permissionsDescription}
                />
              );
            })}
          </ListComponent>
          <PermissionsTable
            empty={false}
            tableTitle={"Admin's Permissions"}
            permissions={rolesPermissions.flatten()}
          />
        </Box>
      )} */}
      </Paper>
    </div>
  );
};

ProfileScreen.propTypes = {
  member: PropTypes.instanceOf(Map).isRequired,
};

export default ProfileScreen;
