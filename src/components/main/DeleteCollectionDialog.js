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
import { CONFIRM_DELETE_BUTTON_ID } from '../../config/selectors';

const useStyles = makeStyles(() => ({
  confirmDeleteButton: {
    color: 'red',
  },
}));

const DeleteCollectionDialog = ({ appDataId, open, handleClose }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  //   const { mutateAsync: deleteAppData } = useMutation(
  //     MUTATION_KEYS.DELETE_APP_DATA,
  //   );

  const onDelete = () => {
    // eslint-disable-next-line no-console
    console.log(appDataId);
    // deleteAppData({ id: appDataId });
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
        {t('Confirm deleting item.')}
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
          id={CONFIRM_DELETE_BUTTON_ID}
          className={classes.confirmDeleteButton}
          onClick={onDelete}
          color="secondary"
          autoFocus
        >
          {t('Delete Permanently')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteCollectionDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  appDataId: PropTypes.string.isRequired,
};

DeleteCollectionDialog.defaultProps = {
  open: false,
};

export default DeleteCollectionDialog;
