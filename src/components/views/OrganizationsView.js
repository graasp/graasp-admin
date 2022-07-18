import React from 'react';
import { useTranslation } from 'react-i18next';
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

  const orgs = [
    {
      id: '1234',
      name: 'GVA',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'gva@graasp.org',
    },
    {
      id: '1235',
      name: 'LYON',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'lyon@graasp.org',
    },
    {
      id: '1236',
      name: 'LYON',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'lyon@graasp.org',
    },
    {
      id: '1237',
      name: 'LYON',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'lyon@graasp.org',
    },
    {
      id: '1234',
      name: 'LYON',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'lyon@graasp.org',
    },
    {
      id: '1234',
      name: 'LYON',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'lyon@graasp.org',
    },
    {
      id: '1234',
      name: 'LYON',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'lyon@graasp.org',
    },
    {
      id: '1234',
      name: 'LYON',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'lyon@graasp.org',
    },
    {
      id: '1234',
      name: 'LYON',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'lyon@graasp.org',
    },
    {
      id: '1234',
      name: 'LYON',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'lyon@graasp.org',
    },
    {
      id: '1234',
      name: 'LYON',
      type: 'org',
      updatedAt: '2022-01-01',
      createdAt: '2022-01-01',
      email: 'lyon@graasp.org',
    },
  ];
  return (
    <Organizations
      title={t('All Organizations')}
      organizations={orgs}
      elementType="organization"
    />
  );
};

export default OrganizationsView;
