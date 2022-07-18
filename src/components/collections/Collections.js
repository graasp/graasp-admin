import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import CollectionsTable from './CollectionsTable';

const Collections = ({ collections, title, id }) => {
  return (
    <CollectionsTable id={id} collections={collections} tableTitle={title} />
  );
};

Collections.propTypes = {
  collections: PropTypes.instanceOf(List).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
};

Collections.defaultProps = {
  id: null,
};

export default Collections;
