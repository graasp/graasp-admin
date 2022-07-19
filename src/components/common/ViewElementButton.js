import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import React from 'react';
import { ELEMENT_DATA_TYPES } from '../../enums';
import {
  buildCollectionPath,
  buildOrganizationPath,
  buildProjectPath,
} from '../../config/paths';

const ViewElementButton = ({ elementType, data }) => {
  const { push } = useHistory();
  const handleClickOpen = () => {
    switch (elementType) {
      case ELEMENT_DATA_TYPES.PROJECT:
        push(buildProjectPath(data.id));
        break;
      case ELEMENT_DATA_TYPES.ORGANIZATION:
        push(buildOrganizationPath(data.id));
        break;
      case ELEMENT_DATA_TYPES.COLLECTION:
        push(buildCollectionPath(data.id));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <IconButton color="primary" onClick={() => handleClickOpen()}>
        <Visibility />
      </IconButton>
    </>
  );
};
ViewElementButton.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  elementType: PropTypes.string.isRequired,
};
export default ViewElementButton;
