import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from '@graasp/ui';
import AddIcon from '@material-ui/icons/Add';
import { CREATE_ITEM_BUTTON_ID } from '../../config/selectors';
import DeleteCollectionDialog from './DeleteCollectionDialog';

const useStyles = makeStyles((theme) => ({
  createNewButton: {
    cursor: 'pointer',
    margin: theme.spacing(1),
    flex: 'none',
  },
}));

const NewElementButton = ({ fontSize, elementType }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip placement="left" title={t('Create new element')} arrow>
        <Button
          id={CREATE_ITEM_BUTTON_ID}
          fontSize={fontSize}
          className={classes.createNewButton}
          onClick={handleClickOpen}
        >
          <AddIcon />
          {elementType}
        </Button>
      </Tooltip>
      <DeleteCollectionDialog
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </>
  );
};

NewElementButton.propTypes = {
  fontSize: PropTypes.string,
  elementType: PropTypes.string,
};

NewElementButton.defaultProps = {
  fontSize: 'large',
  elementType: '',
};

export default NewElementButton;
