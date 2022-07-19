import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
// import { MUTATION_KEYS, useMutation } from '../../config/queryClient';
import { CONFIRM_CREATE_BUTTON_ID } from '../../config/selectors';
import { ELEMENT_DATA_TYPES } from '../../enums';

const useStyles = makeStyles(() => ({
  confirmCreateButton: {
    color: 'red',
  },
}));

const NewElementDialog = ({ elementType, open, handleClose }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleOnCreate = () => {
    switch (elementType) {
      case ELEMENT_DATA_TYPES.ADMIN:
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {t(`Create new ${elementType}.`)}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('Choose one of the following action.')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t('Cancel')}
        </Button>
        <Button
          id={CONFIRM_CREATE_BUTTON_ID}
          className={classes.confirmCreateButton}
          onClick={() => handleOnCreate()}
          color="white"
          autoFocus
          variant="contained"
        >
          {t('Create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NewElementDialog.propTypes = {
  elementType: PropTypes.string.isRequired,
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

NewElementDialog.defaultProps = {
  open: false,
};

export default NewElementDialog;
