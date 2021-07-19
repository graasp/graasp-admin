import React from 'react';
import { useRouteMatch } from 'react-router';
import { Loader } from '@graasp/ui';
import MemberScreen from './MemberScreen';
import { buildMemberPath } from '../../config/paths';

import { hooks } from '../../config/queryClient';
import ItemsTable from '../items/ItemsTable';
import { buildMembersTableId } from '../../config/selectors';

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
      <MemberScreen member={member} />
      <ItemsTable
        id={buildMembersTableId(memberId)}
        empty={false}
        items={items}
      />
    </>
  );
};

export default SingleMember;
