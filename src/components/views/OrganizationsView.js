import React from 'react';
import { useTranslation } from 'react-i18next';
import { mockOrganizations } from '../../config/constants';
import { ELEMENT_DATA_TYPES } from '../../enums';
// import { Loader } from '@graasp/ui';
// import { hooks } from '../../config/queryClient';
import Organizations from '../organizations/Organizations';

// const { useAllMembers } = hooks;

const OrganizationsView = () => {
  const { t } = useTranslation();
  // const { data: allMembers, isLoading } = useAllMembers();

  // if (isLoading) {
  //   return <Loader />;
  // }
  const orgs = mockOrganizations;

  return (
    <Organizations
      title={t('All Organizations')}
      organizations={orgs}
      elementType={ELEMENT_DATA_TYPES.ORGANIZATION}
    />
  );
};

export default OrganizationsView;
