import React from 'react';
import { hooks } from '../../config/queryClient';
import MemberScreen from '../members/MemberScreen';

const { useCurrentMember } = hooks;

const ProfileView = () => {
  const { data: currentMember, isLoading } = useCurrentMember();

  return <>{!isLoading && <MemberScreen member={currentMember} />}</>;
};

export default ProfileView;
