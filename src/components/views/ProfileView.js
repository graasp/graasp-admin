import React from 'react';
import { Loader } from '@graasp/ui';
import { hooks } from '../../config/queryClient';
import MemberScreen from '../members/MemberScreen';

const { useCurrentMember } = hooks;

const ProfileView = () => {
  const { data: currentMember, isLoading } = useCurrentMember();

  if (isLoading) {
    return <Loader />;
  }

  return <MemberScreen member={currentMember} />;
};

export default ProfileView;
