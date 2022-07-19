import React from 'react';
import { useRouteMatch } from 'react-router';
// import { Loader } from '@graasp/ui';
import ProfileScreen from '../common/ProfileScreen';
// import { hooks } from '../../config/queryClient';
import { buildMemberPath } from '../../config/paths';

// const { useMember } = hooks;

const NewProfileView = () => {
  const match = useRouteMatch(buildMemberPath());

  const memberId = match?.params?.memberId;
  // const { data: member, isLoading } = useMember(memberId);

  // if (isLoading) {
  //   return <Loader />;
  // }

  // return <MemberScreen />;
  // Creating a map object
  const currentMember = new Map();

  // Adding [key, value] pair to the map
  currentMember.set('id', memberId);
  currentMember.set('name', 'name');
  currentMember.set('email', 'name@graasp.org');
  currentMember.set('type', 'individual');
  currentMember.set('createdAt', '2022-01-01');
  currentMember.set('extra', { lang: 'en' });

  return <ProfileScreen member={currentMember} />;
  // return <ProfileScreen member={member} />;
};

export default NewProfileView;
