import { useParams } from 'react-router';

import { ItemIcon, Loader } from '@graasp/ui';

import { TABLE_TYPES, itemHeadCells } from '../../config/constants';
import { useMember, useMemberItems } from '../../config/mock';
import { buildItemPath, buildMemberPath } from '../../config/paths';
import CustomTable from '../common/CustomTable';
import MemberDetails from './MemberDetails';

const SingleMember = () => {
  const { memberId } = useParams();
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
