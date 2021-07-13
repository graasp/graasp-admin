import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  AppBar,
  Box,
  Breadcrumbs,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import ReactJson from 'react-json-view';
import { List } from 'immutable';
import { buildItemPath, buildMemberPath, ITEMS_PATH } from '../../config/paths';
import ItemIcon from './ItemIcon';
import {
  buildChildrenItemsTableId,
  buildNavigationLink,
} from '../../config/selectors';
import { formatDate } from '../../utils/date';
import TabPanel from '../common/TabPanel';
import { hooks } from '../../config/queryClient';
import ItemsTable from './ItemsTable';
import Loader from '../common/Loader';

const { useItem, useChildren } = hooks;

const useStyles = makeStyles((theme) => ({
  icon: {
    width: '100%',
    height: 100,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const ItemScreen = () => {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();
  const match = useRouteMatch(buildItemPath());
  const itemId = match?.params?.itemId;
  const { data: item, isLoading } = useItem(itemId);

  console.log(itemId);
  const { data: children, isLoading: childrenLoading } = useChildren(itemId);

  if (isLoading || childrenLoading) {
    return <Loader />;
  }
  console.log(item);
  console.log(children);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {!isLoading && (
        <>
          <Box
            justifyContent="left"
            display="flex"
            p={1}
            bgcolor="background.paper"
          >
            <Box display="flex" flexDirection="row">
              <Box p={2}>
                <ItemIcon
                  size="100"
                  type={item.get('type')}
                  extra={item.get('extra')}
                  name={item.get('name')}
                />
              </Box>
              <Box display="flex" p={2} flexDirection="column">
                <Typography
                  align="left"
                  id={buildNavigationLink(item.get('id'))}
                >
                  {`Id: ${item.get('id')}`}
                </Typography>
                <Typography
                  align="left"
                  id={buildNavigationLink(item.get('id'))}
                >
                  {`Type: ${item.get('type')}`}
                </Typography>
                <Typography
                  align="left"
                  id={buildNavigationLink(item.get('id'))}
                >
                  {`Name: ${item.get('name')}`}
                </Typography>
                <Typography
                  align="left"
                  id={buildNavigationLink(item.get('id'))}
                >
                  {`Description: ${item.get('description')}`}
                </Typography>
              </Box>
              <Box display="flex" p={2} flexDirection="column">
                <Typography
                  align="left"
                  id={buildNavigationLink(item.get('id'))}
                >
                  {`Owner `}
                  <Link
                    color="inherit"
                    to={buildMemberPath(item.get('creator'))}
                  >
                    {item.get('ownerName')}
                  </Link>
                </Typography>
                <Typography
                  align="left"
                  id={buildNavigationLink(item.get('id'))}
                >
                  {`Created At: ${formatDate(item.get('createdAt'))}`}
                </Typography>
                <Typography
                  align="left"
                  id={buildNavigationLink(item.get('id'))}
                >
                  {`Last time updated: ${formatDate(item.get('updatedAt'))}`}
                </Typography>

                <Typography
                  align="left"
                  id={buildNavigationLink(item.get('id'))}
                >
                  {`Parents: `}
                </Typography>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                  <Link color="inherit" to={ITEMS_PATH}>
                    All Items
                  </Link>
                  {/* {parents.map(({ name, id }) => ( */}
                  {/*  <Link color="inherit" to={buildItemPath(id)}> */}
                  {/*    {name} */}
                  {/*  </Link> */}
                  {/* ))} */}
                </Breadcrumbs>
              </Box>
            </Box>
          </Box>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                scrollButtons="off"
                textColor="primary"
                aria-label="scrollable-prevent-tabs"
                indicatorColor="primary"
              >
                <Tab
                  label="Children"
                  id={`scrollable-prevent-tab-${0}`}
                  aria-controls={`scrollable-prevent-tabpanel-${0}`}
                />
                <Tab
                  label="Members"
                  id={`scrollable-prevent-tab-${1}`}
                  aria-controls={`scrollable-prevent-tabpanel-${1}`}
                />
                <Tab
                  label="Settings"
                  id={`scrollable-prevent-tab-${2}`}
                  aria-controls={`scrollable-prevent-tabpanel-${2}`}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              {children.isEmpty() ? (
                <Typography>No Children found</Typography>
              ) : (
                <ItemsTable
                  empty={false}
                  items={children}
                  id={buildChildrenItemsTableId(itemId)}
                />
              )}
            </TabPanel>
            {/* <TabPanel value={value} index={1}> */}
            {/*  /!* <MembersTable *!/ */}
            {/*  /!*  empty={false} *!/ */}
            {/*  /!*  members={List(members)} *!/ */}
            {/*  /!*  id={buildMembersTableId(itemId)} *!/ */}
            {/*  /!* /> *!/ */}
            {/* </TabPanel> */}
            <TabPanel value={value} index={2}>
              <Typography>Extra:</Typography>
              <ReactJson src={item.get('extra')} />
            </TabPanel>
          </div>
        </>
      )}
    </div>
  );
};
export default ItemScreen;
