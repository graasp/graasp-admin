import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DeleteElementDialog from './DeleteElementDialog';

const DeleteElementButton = ({ elementType, data }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton color="primary" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <DeleteElementDialog
        open={open}
        handleClose={handleClose}
        elementId={data.id}
        elementType={elementType}
      />
    </>
  );
};

DeleteElementButton.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  elementType: PropTypes.string.isRequired,
};

export default DeleteElementButton;
