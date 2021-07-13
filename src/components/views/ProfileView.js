import React from 'react';
import { hooks } from '../../config/queryClient';
import MemberScreen from '../members/MemberScreen';
import Loader from '../common/Loader';

const { useCurrentMember } = hooks;

const ProfileView = () => {
  const { data: currentMember, isLoading } = useCurrentMember();

  if (isLoading) {
    return <Loader />;
  }
  return <MemberScreen member={currentMember} />;
};

export default ProfileView;
