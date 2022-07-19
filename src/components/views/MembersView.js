import React from 'react';
import { mockMembers } from '../../config/constants';
// import { Loader } from '@graasp/ui';
// import { hooks } from '../../config/queryClient';
// import Members from '../members/Members';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import { buildMemberPath } from '../../config/paths';
// import { memberHeadCell, TABLE_TYPES } from '../../config/constants';
// import CustomTable from '../common/CustomTable';
import Members from '../members/Members';

// const { useAllMembers } = hooks;

const MembersView = () => {
  const members = mockMembers;
  // const { data: allMembers, isLoading } = useAllMembers();

  // if (isLoading) {
  //   return <Loader />;
  // }

  // return (
  //   <CustomTable
  //     link={buildMemberPath}
  //     tableType={TABLE_TYPES.MEMBER}
  //     headCells={memberHeadCell}
  //     tableTitle="All Members"
  //     // rows={allMembers}
  //     rows={mockMembers}
  //     checkBox
  //     empty
  //     icon={<AccountCircleIcon />}
  //     iconCell="name"
  //     search
  //     title
  //   />
  // );

  return <Members title="All Members" members={members} />;
};

export default MembersView;
