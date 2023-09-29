import React from 'react';
import ReactJson from 'react-json-view';
import { Link, useParams } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material//AccountCircle';
import { AppBar, Box, Breadcrumbs, Tab, Tabs, Typography } from '@mui/material';

import { ItemIcon, Loader } from '@graasp/ui';

import {
  DEFAULT_LOCALE,
  TABLE_TYPES,
  itemHeadCells,
  memberHeadCell,
} from '../../config/constants';
import {
  useChildren,
  useItem,
  useItemMembers,
  useParents,
} from '../../config/mock';
import { ITEMS_PATH, buildItemPath, buildMemberPath } from '../../config/paths';
import {
  buildNavigationLink,
  buildScrollableTabId,
} from '../../config/selectors';
import CustomTable from '../common/CustomTable';
import TabPanel from '../common/TabPanel';
import { formatDate } from '@graasp/sdk';

const SingleItem = () => {
  const [value, setValue] = React.useState(0);

  const { itemId } = useParams();
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
console.log(name, createdAt)
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
              {`Created At: ${formatDate(createdAt, {locale: DEFAULT_LOCALE})}`}
            </Typography>
            <Typography align="left" id={buildNavigationLink(id)}>
              {`Last time updated: ${formatDate(updatedAt, {locale: DEFAULT_LOCALE})}`}
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
      <div>
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
            <CustomTable
              link={buildItemPath}
              tableType={TABLE_TYPES.ITEM}
              headCells={itemHeadCells}
              tableTitle="All Items"
              rows={children}
              checkBox
              empty
              icon={<ItemIcon />}
              iconCell="name"
              iconInfo={['name', 'extra', 'type']}
              search
              title
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomTable
            link={buildMemberPath}
            tableType={TABLE_TYPES.MEMBER}
            headCells={memberHeadCell}
            tableTitle="All Members"
            rows={members}
            checkBox
            empty
            icon={<AccountCircleIcon />}
            iconCell="name"
            search
            title
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
