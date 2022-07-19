import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Apps } from '@material-ui/icons';
import ReusableTable from '../common/ReusableTable';
import { collectionsHeadCells } from '../../config/constants';

const Collections = ({ collections, title, id, elementType }) => {
  const headCells = collectionsHeadCells;

  return (
    <>
      <ReusableTable
        id={id}
        rows={collections}
        tableTitle={title}
        icon={<Apps />}
        elementType={elementType}
        headCells={headCells}
      />
    </>
  );
};

Collections.propTypes = {
  collections: PropTypes.instanceOf(List).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  elementType: PropTypes.string.isRequired,
};

Collections.defaultProps = {
  id: null,
};

export default Collections;
