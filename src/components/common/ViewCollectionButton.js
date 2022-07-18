import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { Visibility } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { buildCollectionPath } from '../../config/paths';

const ViewCollectionButton = ({ data }) => {
  const { push } = useHistory();
  const handleClickOpen = () => {
    push(buildCollectionPath(data.id));
  };

  return (
    <>
      <IconButton color="primary" onClick={handleClickOpen}>
        <Visibility />
      </IconButton>
    </>
  );
};

ViewCollectionButton.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ViewCollectionButton;
