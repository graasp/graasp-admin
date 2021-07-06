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
import { List } from 'immutable';
import ReactJson from 'react-json-view';
import { buildItemPath, buildMemberPath, ITEMS_PATH } from '../../config/paths';
import itemData from '../../data/itemData';
import ItemIcon from './ItemIcon';
import {
  buildChildrenItemsTableId,
  buildMembersTableId,
  buildNavigationLink,
} from '../../config/selectors';
import {
  getChildren,
  getItemFromIds,
  getMembershipsByItemPath,
  getParentsIdsFromPath,
  insertCreatorWithItems,
} from '../../utils/item';
import ItemsTable from './ItemsTable';
import { formatDate } from '../../utils/date';
import { getMembersByMemberships } from '../../utils/member';
import MembersTable from '../members/MembersTable';
import TabPanel from '../common/TabPanel';

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
  const itemsWithCreators = insertCreatorWithItems(itemData);
  const item = itemsWithCreators.find(({ id }) => itemId === id);

  const parentsIds = getParentsIdsFromPath(item?.path);
  const parents = getItemFromIds(parentsIds);
  const children = getChildren(itemsWithCreators, itemId);

  const members = parents
    .map((parent) => {
      const memberships = getMembershipsByItemPath(parent.path);
      return getMembersByMemberships(memberships);
    })
    .flat();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
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
              type={item?.type}
              extra={item?.extra}
              name={item?.name}
            />
          </Box>
          <Box display="flex" p={2} flexDirection="column">
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              {`Id: ${item?.id}`}
            </Typography>
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              {`Type: ${item?.type}`}
            </Typography>
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              {`Name: ${item?.name}`}
            </Typography>
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              {`Description: ${item?.description}`}
            </Typography>
          </Box>
          <Box display="flex" p={2} flexDirection="column">
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              {`Owner `}
              <Link color="inherit" to={buildMemberPath(item?.creator)}>
                {item?.owner}
              </Link>
            </Typography>
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              {`Created At: ${formatDate(item?.createdAt)}`}
            </Typography>
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              {`Last time updated: ${formatDate(item?.updatedAt)}`}
            </Typography>

            <Typography align="left" id={buildNavigationLink(item?.id)}>
              {`Parents: `}
            </Typography>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link color="inherit" to={ITEMS_PATH}>
                All Items
              </Link>
              {parents.map(({ name, id }) => (
                <Link color="inherit" to={buildItemPath(id)}>
                  {name}
                </Link>
              ))}
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
          {children.length === 0 ? (
            <Typography>No Children found</Typography>
          ) : (
            <ItemsTable
              empty={false}
              items={List(children)}
              id={buildChildrenItemsTableId(itemId)}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MembersTable
            empty={false}
            members={List(members)}
            id={buildMembersTableId(itemId)}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Extra:</Typography>
          <ReactJson src={item?.extra} />
        </TabPanel>
      </div>
    </div>
  );
};
export default ItemScreen;
