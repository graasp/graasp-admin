import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { Button } from '@graasp/ui';

import PropTypes from 'prop-types';

const ConfirmationDialog = ({
  title,
  content,
  open,
  setOpen,
  handleSubmit,
}) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus variant="text">
          {t('Cancel')}
        </Button>
        <Button onClick={handleSubmit}>{t('Confirm')}</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
