import React from 'react';
import { useRouteMatch } from 'react-router';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Typography, Box } from '@material-ui/core';
import { List } from 'immutable';
import { buildMemberPath } from '../../config/paths';
import membersData from '../../data/membersData';
import { formatDate } from '../../utils/date';
import { getMembershipsByMemberId } from '../../utils/member';
import { insertCreatorWithItems } from '../../utils/item';
import itemData from '../../data/itemData';
import ItemsTable from '../items/ItemsTable';

const MemberScreen = () => {
  const match = useRouteMatch(buildMemberPath());
  const memberId = match?.params?.memberId;
  const member = membersData.find(({ id }) => id === memberId);
  const itemsWithCreators = insertCreatorWithItems(itemData);

  const memberships = getMembershipsByMemberId(member?.id);

  const itemsPaths = memberships.map(({ itemPath }) => itemPath);

  const items = itemsWithCreators.filter(({ path }) =>
    itemsPaths.includes(path),
  );

  return (
    <div style={{ width: '100%' }}>
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Box
          display="flex"
          flexDirection="column"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <AccountCircleIcon style={{ fontSize: 150, width: '100%' }} />
          <Typography>{`Id: ${member?.id}`}</Typography>
          <Typography>{`Name: ${member?.name}`}</Typography>
          <Typography>{`Email: ${member?.email}`}</Typography>
          <Typography>{`Type: ${member?.type}`}</Typography>
          <Typography>
            {`Created At: ${formatDate(member?.createdAt)}`}
          </Typography>
        </Box>
      </Box>
      <ItemsTable
        id={`Member_${memberId}_Item_Table`}
        empty={false}
        items={List(items)}
      />
    </div>
  );
};

export default MemberScreen;