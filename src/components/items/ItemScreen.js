/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  AppBar,
  Box,
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
import { buildNavigationLink } from '../../config/selectors';
import membersData from '../../data/membersData';
import {
  getChildren,
  getItemFromIds,
  getMembershipsByItemPath,
  getParentsIdsFromPath,
} from '../../utils/item';
import ItemsTable from './ItemsTable';
import { formatDate } from '../../utils/date';
import getMembersByMemberships from '../../utils/member';
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

const getOwner = (itemOwnerId) => {
  return membersData.find(({ id }) => itemOwnerId === id);
};

// Will be removed later
const insertCreatorWithItems = (items) =>
  items.map((item) => {
    return {
      ...item,
      owner: getOwner(item.creator).name,
    };
  });

const ItemScreen = () => {
  const classes = useStyles();
  const match = useRouteMatch(buildItemPath());
  const itemId = match?.params?.itemId;
  const itemsWithCreators = insertCreatorWithItems(itemData);
  const item = itemsWithCreators.find(({ id }) => itemId === id);

  const parentsIds = getParentsIdsFromPath(item?.path);
  const parents = getItemFromIds(parentsIds);
  const children = getChildren(itemsWithCreators, itemId);

  const [value, setValue] = React.useState(0);

  const members = parents
    .map((parent) => {
      const memberships = getMembershipsByItemPath(parent.path);
      return getMembersByMemberships(memberships);
    })
    .flat();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderRootLink = () => {
    return (
      <span>
        <Link color="inherit" to={ITEMS_PATH}>
          All Items
        </Link>
        {' / '}
      </span>
    );
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
              Id: {item?.id}
            </Typography>
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              Type:
              {'  '}
              {item?.type}
            </Typography>
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              Name:
              {'  '}
              {item?.name}
            </Typography>
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              Description:
              {'  '}
              {item?.description}
            </Typography>
          </Box>
          <Box display="flex" p={2} flexDirection="column">
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              Owner:
              {'  '}
              <Link color="inherit" to={buildMemberPath(item?.creator)}>
                {item?.owner}
              </Link>
            </Typography>
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              Created At:
              {'  '}
              {formatDate(item?.createdAt)}
            </Typography>
            <Typography align="left" id={buildNavigationLink(item?.id)}>
              Last time updated:
              {'  '}
              {formatDate(item?.updatedAt)}
            </Typography>

            <Typography align="left" id={buildNavigationLink(item?.id)}>
              Parents:
              {'  '}
              {renderRootLink()}
              {parents
                .slice(0, parents.length - 1)
                .map(({ name, id }, index) => (
                  <span>
                    <Link color="inherit" to={buildItemPath(id)}>
                      {name}
                    </Link>
                    {index !== parents.length - 2 && ' / '}
                  </span>
                ))}
            </Typography>
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
            aria-label="scrollable prevent tabs example"
            indicatorColor="primary"
          >
            <Tab
              label={`${item?.name}'s Children`}
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
          {children.length !== 0 && (
            <ItemsTable
              empty={false}
              items={List(children)}
              id={`${item?.name}_TABLE`}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {members.length !== 0 && (
            <MembersTable
              empty={false}
              members={List(members)}
              id={`${item?.name}_MEMBERS_TABLE`}
            />
          )}
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
