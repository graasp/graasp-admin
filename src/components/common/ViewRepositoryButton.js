import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { Visibility } from '@material-ui/icons';
import { buildRepositoryPath } from '../../query-client/api/routes';

const ViewRepositoryButton = ({ repository }) => {
  const handleClickOpen = () => {
    window.open(
      buildRepositoryPath(repository),
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <>
      <IconButton color="primary" onClick={handleClickOpen}>
        <Visibility />
      </IconButton>
    </>
  );
};

ViewRepositoryButton.propTypes = {
  repository: PropTypes.string.isRequired,
};

export default ViewRepositoryButton;
