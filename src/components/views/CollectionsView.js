import React from 'react';
import { useTranslation } from 'react-i18next';
import { mockCollections } from '../../config/constants';
import { ELEMENT_DATA_TYPES } from '../../enums';
// import { Loader } from '@graasp/ui';
// import Members from '../members/Members';
// import { hooks } from '../../config/queryClient';
import Collections from '../collections/Collections';

// const { useAllMembers } = hooks;

const CollectionsView = () => {
  const { t } = useTranslation();
  // const { data: allMembers, isLoading } = useAllMembers();

  // if (isLoading) {
  //   return <Loader />;
  // }

  const collections = mockCollections;

  return (
    <Collections
      title={t('All Collections')}
      collections={collections}
      elementType={ELEMENT_DATA_TYPES.COLLECTION}
    />
  );
};

export default CollectionsView;
