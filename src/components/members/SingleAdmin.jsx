import { useParams } from 'react-router';

import ExpandMoreIcon from '@mui/icons-material//ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List as ListComponent,
  Typography,
} from '@mui/material';

import { ItemIcon, Loader } from '@graasp/ui';

import { List, Map } from 'immutable';
import PropTypes from 'prop-types';

import {
  TABLE_TYPES,
  itemHeadCells,
  permissionHeadCells,
} from '../../config/constants';
import {
  useMember,
  useMemberItems,
  useMembersRole,
  useRolesPermissions,
} from '../../config/mock';
import {
  buildAdminPath,
  buildItemPath,
  buildPermissionPath,
} from '../../config/paths';
import CustomTable from '../common/CustomTable';
import ExpandableListItem from '../common/ExpandableListItem';
import MemberDetails from './MemberDetails';

const SingleAdmin = ({ admin }) => {
  const { adminId } = useParams();

  const { data: member, isLoading } = useMember(adminId);

  const currentMember = admin || member;

  const { data: currentRoles, isLoading: isLoadingRoles } = useMembersRole(
    currentMember?.get('id'),
  );
  const { data: rolesPermissions, isLoading: isLoadingRP } =
    useRolesPermissions(currentRoles?.map((role) => role.id));
  const { data: items, isLoadingMemberItems } = useMemberItems(
    currentMember?.get('id'),
  );

  if (isLoading || isLoadingRoles || isLoadingRP || isLoadingMemberItems) {
    return <Loader />;
  }

  return (
    <>
      <MemberDetails member={currentMember} />
      <div>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Items</Typography>
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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Admin Rights</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection="row" bgcolor="background.paper">
              <ListComponent
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <Typography variant="h6">Roles</Typography>
                }
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
              <CustomTable
                link={buildPermissionPath}
                tableType={TABLE_TYPES.PERMISSION}
                headCells={permissionHeadCells}
                tableTitle="Admin's Permissions"
                rows={List(rolesPermissions.toArray().flat())}
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
  admin: PropTypes.instanceOf(Map),
};

SingleAdmin.defaultProps = {
  admin: null,
};
export default SingleAdmin;
