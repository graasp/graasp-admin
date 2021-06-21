import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link, useRouteMatch } from 'react-router-dom';
import { buildMemberPath } from '../../config/paths';
import { buildNavigationLink } from '../../config/selectors';
import membersData from '../../data/membersData';

const Navigation = () => {
  const match = useRouteMatch(buildMemberPath());
  const memberId = match?.params?.memberId;
  const member = membersData.find(({ id }) => memberId === id);

  // const renderRootLink = () => {
  //   // build root depending on user permission or pathname
  //   // todo: consider accessing from guest
  //   const ownItem =
  //     pathname === HOME_PATH || item?.get('creator') === user?.get('id');
  //   const to = ownItem ? HOME_PATH : SHARED_ITEMS_PATH;
  //   const text = ownItem ? t('My Items') : t('Shared Items');
  //
  //   return (
  //     <Link color="inherit" to={to}>
  //       <Typography id={NAVIGATION_HOME_LINK_ID}>{text}</Typography>
  //     </Link>
  //   );
  // };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* {renderRootLink()} */}
      {memberId && (
        <Link key={memberId} to={buildMemberPath(memberId)}>
          <Typography id={buildNavigationLink(memberId)}>
            {member.name}
          </Typography>
        </Link>
      )}
    </Breadcrumbs>
  );
};

export default Navigation;
