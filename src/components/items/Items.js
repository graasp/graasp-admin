import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import ItemsTable from './ItemsTable';

const Items = ({ items, title, id }) => {
  return (
    <>
      <ItemsTable id={id} items={items} tableTitle={title} />
    </>
  );
};

Items.propTypes = {
  items: PropTypes.instanceOf(List).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
};

Items.defaultProps = {
  id: null,
};

export default Items;
