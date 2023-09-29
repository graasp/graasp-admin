import React from 'react';

import { Loader } from '@graasp/ui';

import { hooks } from '../../config/queryClient';
import SingleAdmin from '../members/SingleAdmin';

const { useCurrentMember } = hooks;

const ProfileView = () => {
  const { data: currentMember, isLoading } = useCurrentMember();

  if (isLoading) {
    return <Loader />;
  }

  if (!currentMember || !currentMember?.get('id')) {
    return 'You are not connected';
  }

  return <SingleAdmin admin={currentMember} />;
};

export default ProfileView;
