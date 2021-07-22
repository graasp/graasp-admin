import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Typography,
  Box,
  List as ListComponent,
  ListSubheader,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ReactJson from 'react-json-view';
import { Loader } from '@graasp/ui';
import { formatDate } from '../../utils/date';
import { hooks } from '../../config/queryClient';
import PermissionsTable from '../permissions/PermissionsTable';
import ExpandableListItem from '../common/ExpandableListItem';
import { MAX_WIDTH_LIST } from '../../config/constants';

const { useMembersRole, useRolesPermissions } = hooks;

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: MAX_WIDTH_LIST,
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

  const listTitle = (
    <ListSubheader component="div" id="nested-list-subheader">
      Roles
    </ListSubheader>
  );

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
      )}
    </div>
  );
};

MemberScreen.propTypes = {
  member: PropTypes.instanceOf(Map).isRequired,
};

export default MemberScreen;
