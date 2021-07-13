import React from 'react';
import { useRouteMatch } from 'react-router';
import MemberScreen from './MemberScreen';
import { buildMemberPath } from '../../config/paths';

import { hooks } from '../../config/queryClient';

const { useMember } = hooks;
const SingleMember = () => {
  const match = useRouteMatch(buildMemberPath());

  const memberId = match?.params?.memberId;
  const { data: member, isLoading } = useMember(memberId);

  console.log(memberId, member, isLoading);
  // const itemsWithCreators = insertCreatorWithItems(itemData);
  //
  // const memberships = getMembershipsByMemberId(member?.id);
  //
  // const itemsPaths = memberships.map(({ itemPath }) => itemPath);
  //
  // const items = itemsWithCreators.filter(({ path }) =>
  //   itemsPaths.includes(path),
  // );

  return (
    <>
      {!isLoading && <MemberScreen member={member} />}
      {/* <ItemsTable */}
      {/*  id={`Member_${memberId}_Item_Table`} */}
      {/*  empty={false} */}
      {/*  items={List(items)} */}
      {/* /> */}
    </>
  );
};

export default SingleMember;
