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
import { Loader } from '@graasp/ui';
import { buildItemPath, buildMemberPath, ITEMS_PATH } from '../../config/paths';
import ItemIcon from './ItemIcon';
import {
  buildChildrenItemsTableId,
  buildMembersTableId,
  buildNavigationLink,
  buildScrollableTabId,
} from '../../config/selectors';
import { formatDate } from '../../utils/date';
import TabPanel from '../common/TabPanel';
import { hooks } from '../../config/queryClient';
import ItemsTable from './ItemsTable';
import MembersTable from '../members/MembersTable';

const { useItem, useChildren, useItemMembers, useParents } = hooks;

const useStyles = makeStyles((theme) => ({
  icon: {
    width: '100%',
    height: 100,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const SingleItem = () => {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();
  const match = useRouteMatch(buildItemPath());
  const itemId = match?.params?.itemId;
  const { data: item, isLoading } = useItem(itemId);

  const { data: children, isLoading: isChildrenLoading } = useChildren(itemId);

  const { data: members, isLoading: isMembersLoading } = useItemMembers(itemId);

  const { data: parents, isLoading: isParentsLoading } = useParents(itemId);

  if (isLoading || isChildrenLoading || isMembersLoading || isParentsLoading) {
    return <Loader />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const type = item.get('type');
  const id = item.get('id');
  const name = item.get('name');
  const extra = item.get('extra');
  const description = item.get('description');
  const ownerName = item.get('ownerName');
  const ownerId = item.get('creator');
  const createdAt = item.get('createdAt');
  const updatedAt = item.get('updatedAt');

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
            <ItemIcon size="100" type={type} extra={extra} name={name} />
          </Box>
          <Box display="flex" p={2} flexDirection="column">
            <Typography align="left">{`Id: ${id}`}</Typography>
            <Typography align="left">{`Type: ${type}`}</Typography>
            <Typography align="left">{`Name: ${name}`}</Typography>
            <Typography align="left">
              {`Description: ${description}`}
            </Typography>
          </Box>
          <Box display="flex" p={2} flexDirection="column">
            <Typography align="left">
              {`Owner `}
              <Link color="inherit" to={buildMemberPath(ownerId)}>
                {ownerName}
              </Link>
            </Typography>
            <Typography align="left">
              {`Created At: ${formatDate(createdAt)}`}
            </Typography>
            <Typography align="left" id={buildNavigationLink(id)}>
              {`Last time updated: ${formatDate(updatedAt)}`}
            </Typography>

            <Typography align="left" id={buildNavigationLink(id)}>
              {`Parents: `}
            </Typography>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link color="inherit" to={ITEMS_PATH}>
                All Items
              </Link>
              {parents.map(({ name: itemName, id: parentId }) => (
                <Link color="inherit" to={buildItemPath(parentId)}>
                  {itemName}
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
              id={buildScrollableTabId(0)}
              aria-controls={`scrollable-prevent-tabpanel-${0}`}
            />
            <Tab
              label="Members"
              id={buildScrollableTabId(1)}
              aria-controls={`scrollable-prevent-tabpanel-${1}`}
            />
            <Tab
              label="Settings"
              id={buildScrollableTabId(2)}
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
        <TabPanel value={value} index={1}>
          <MembersTable
            empty={false}
            members={members}
            id={buildMembersTableId(itemId)}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Extra:</Typography>
          <ReactJson src={extra} />
        </TabPanel>
      </div>
    </div>
  );
};
export default SingleItem;
