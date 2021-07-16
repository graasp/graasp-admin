import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Typography, Box, List, ListSubheader } from '@material-ui/core';
import PropTypes from 'prop-types';
import { List as ListM } from 'immutable';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ReactJson from 'react-json-view';
import { formatDate } from '../../utils/date';
import { hooks } from '../../config/queryClient';
import Loader from '../common/Loader';
import PermissionsTable from '../permissions/PermissionsTable';
import ExpandableListItem from '../common/ExpandableListItem';

const { useMembersRole, useRolesPermissions } = hooks;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    fontSize: 150,
    width: '100%',
  },
}));

const MemberScreen = ({ member }) => {
  const classes = useStyles();

  const { data: currentRoles, isLoading: isLoadingRoles } = useMembersRole(
    member.get('id'),
  );

  const {
    data: rolesPermissions,
    isLoading: isLoadingRP,
  } = useRolesPermissions(currentRoles?.map((role) => role.id));

  if (isLoadingRoles || isLoadingRP) {
    return <Loader />;
  }

  return (
    <div>
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
          <AccountCircleIcon className={classes.icon} />
          <Typography>{`Id: ${member.get('id')}`}</Typography>
          <Typography>{`Name: ${member.get('name')}`}</Typography>
          <Typography>{`Email: ${member.get('email')}`}</Typography>
          <Typography>{`Type: ${member.get('type')}`}</Typography>
          <Typography>
            {`Created At: ${formatDate(member.get('createdAt'))}`}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <Typography>Extra:</Typography>

          <ReactJson src={member.get('extra')} />
        </Box>
      </Box>
      {!currentRoles.isEmpty() && (
        <Box
          display="flex"
          flexDirection="row"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <ListSubheader component="div" id="nested-list-subheader">
                Roles
              </ListSubheader>
            }
            className={classes.root}
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
          </List>
          <PermissionsTable
            empty={false}
            tableTitle={"Admin's Permissions"}
            permissions={ListM(rolesPermissions.toArray().flat())}
          />
        </Box>
      )}
    </div>
  );
};

MemberScreen.propTypes = {
  member: PropTypes.instanceOf(Map).isRequired,
};

export default MemberScreen;
