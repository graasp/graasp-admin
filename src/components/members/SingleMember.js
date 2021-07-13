import React from 'react';
import { useRouteMatch } from 'react-router';
import MemberScreen from './MemberScreen';
import { buildMemberPath } from '../../config/paths';

import { hooks } from '../../config/queryClient';
import ItemsTable from '../items/ItemsTable';
import Loader from '../common/Loader';

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
      {!isLoading && <MemberScreen member={member} />}
      <ItemsTable
        id={`Member_${memberId}_Item_Table`}
        empty={false}
        items={items}
      />
    </>
  );
};

export default SingleMember;
