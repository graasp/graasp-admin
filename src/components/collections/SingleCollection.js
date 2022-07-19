import React from 'react';
import { useRouteMatch } from 'react-router';
import {
  mockSingleCollection,
  mockSingleCollectionItems,
} from '../../config/constants';
import { buildCollectionPath } from '../../config/paths';

import ItemsTable from '../items/ItemsTable';

const SingleCollection = () => {
  const match = useRouteMatch(buildCollectionPath());

  const collectionId = match?.params?.collectionId;

  // const { data: collection, isLoading } = useCollection(collectionId);
  const collection = mockSingleCollection;

  const items = mockSingleCollectionItems;
  return (
    <>
      <ItemsTable
        id={collectionId}
        items={items}
        tableTitle={collection.name}
      />
    </>
  );
};

export default SingleCollection;
