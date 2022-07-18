import React from 'react';
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
  // const { data: allMembers, isLoading } = useAllMembers();

  // if (isLoading) {
  //   return <Loader />;
  // }

  const mockMembers = [
    {
      id: '123',
      name: 'A',
      type: 'individual',
      createdAt: '2022-01-01',
      updatedAt: '2022-04-13T14:09:23.743Z',
      email: 'A@graasp.org',
    },
    {
      id: '456',
      name: 'B',
      type: 'individual',
      createdAt: '2022-01-01',
      updatedAt: '2022-04-13T14:09:23.743Z',
      email: 'B@graasp.org',
    },
  ];
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

  return <Members title="All Members" members={mockMembers} />;
};

export default MembersView;
