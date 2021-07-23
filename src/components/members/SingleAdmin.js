import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List as ListM, Map as MapM } from 'immutable';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useRouteMatch } from 'react-router';
import { hooks } from '../../config/queryClient';
import MemberDetails from './MemberDetails';
import Loader from '../common/Loader';
import ExpandableListItem from '../common/ExpandableListItem';
import {
  buildAdminPath,
  buildItemPath,
  buildPermissionPath,
} from '../../config/paths';
import {
  itemHeadCells,
  permissionHeadCells,
  TABLE_TYPES,
} from '../../config/constants';
import CustomTable from '../common/CustomTable';
import ItemIcon from '../items/ItemIcon';

const {
  useMember,
  useMembersRole,
  useRolesPermissions,
  useMemberItems,
} = hooks;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    boxShadow: 'none',
  },
  box: {
    width: '100%',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const SingleAdmin = ({ admin }) => {
  const classes = useStyles();

  const match = useRouteMatch(buildAdminPath());

  const adminId = match?.params?.adminId;

  const { data: member, isLoading } = useMember(adminId);

  const currentMember = !admin ? member : admin;

  const { data: currentRoles, isLoading: isLoadingRoles } = useMembersRole(
    currentMember?.get('id'),
  );
  const {
    data: rolesPermissions,
    isLoading: isLoadingRP,
  } = useRolesPermissions(currentRoles?.map((role) => role.id));
  const { data: items, isLoadingMemberItems } = useMemberItems(
    currentMember?.get('id'),
  );

  if (isLoading || isLoadingRoles || isLoadingRP || isLoadingMemberItems) {
    return <Loader />;
  }

  return (
    <>
      <MemberDetails member={currentMember} />
      <div className={classes.root}>
        <Accordion defaultExpanded className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Items</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CustomTable
              link={buildItemPath}
              tableType={TABLE_TYPES.ITEM}
              headCells={itemHeadCells}
              tableTitle="Admin's Items"
              rows={items}
              checkBox
              empty
              icon={<ItemIcon />}
              iconCell="name"
              iconInfo={['name', 'extra', 'type']}
              search
              title
            />
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Admin Rights</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              display="flex"
              flexDirection="row"
              bgcolor="background.paper"
              className={classes.box}
            >
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <Typography className={classes.title} variant="h6">
                    Roles
                  </Typography>
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
              <CustomTable
                link={buildPermissionPath}
                tableType={TABLE_TYPES.PERMISSION}
                headCells={permissionHeadCells}
                tableTitle="Admin's Permissions"
                rows={ListM(rolesPermissions.toArray().flat())}
                checkBox
                empty
                search
                title
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

SingleAdmin.propTypes = {
  admin: PropTypes.instanceOf(MapM),
};

SingleAdmin.defaultProps = {
  admin: null,
};
export default SingleAdmin;
