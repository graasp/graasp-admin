import React from 'react';
import { useRouteMatch } from 'react-router';
import { Loader } from '@graasp/ui';
import MemberDetails from './MemberDetails';
import { buildItemPath, buildMemberPath } from '../../config/paths';

import { hooks } from '../../config/queryClient';
import { itemHeadCells, TABLE_TYPES } from '../../config/constants';
import ItemIcon from '../items/ItemIcon';
import CustomTable from '../common/CustomTable';

const { useMember, useMemberItems } = hooks;
const SingleMember = () => {
  const match = useRouteMatch(buildMemberPath());

  const memberId = match?.params?.memberId;
  const { data: member, isLoading } = useMember(memberId);
  const { data: items, isLoadingMemberItems } = useMemberItems(memberId);

  if (isLoading || isLoadingMemberItems) {
    return <Loader />;
  }
  return (
    <>
      <MemberDetails member={member} />
      <CustomTable
        link={buildItemPath}
        tableType={TABLE_TYPES.ITEM}
        headCells={itemHeadCells}
        tableTitle="All Items"
        rows={items}
        checkBox
        empty
        icon={<ItemIcon />}
        iconCell="name"
        iconInfo={['name', 'extra', 'type']}
        search
        title
      />
    </>
  );
};

export default SingleMember;
