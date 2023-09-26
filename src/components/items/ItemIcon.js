import React from 'react';
import PropTypes from 'prop-types';
import MusicNoteIcon from '@mui/icons-material//MusicNote';
import InsertDriveFileIcon from '@mui/icons-material//InsertDriveFile';
import { makeStyles } from '@mui/material';
import FolderIcon from '@mui/icons-material//Folder';
import PictureAsPdfIcon from '@mui/icons-material//PictureAsPdf';
import LinkIcon from '@mui/icons-material//Link';
import MovieIcon from '@mui/icons-material//Movie';
import DescriptionIcon from '@mui/icons-material//Description';
import ImageIcon from '@mui/icons-material//Image';
import ShortcutIcon from '@mui/icons-material//Input';
import {
  ITEMS_TABLE_ROW_ICON_COLOR,
  MIME_TYPES,
  ITEM_ICON_MAX_SIZE,
} from '../../config/constants';
import {
  fileExtraPropTypes,
  getEmbeddedLinkExtra,
  getFileExtra,
  getS3FileExtra,
  linkExtraPropTypes,
  s3FileExtraPropTypes,
} from '../../utils/itemExtra';
import { ITEM_TYPES } from '../../enums';

const useStyles = makeStyles({
  imageIcon: {
    maxHeight: ITEM_ICON_MAX_SIZE,
    maxWidth: ITEM_ICON_MAX_SIZE,
  },
});

const ItemIcon = ({ name, type, extra, size }) => {
  const classes = useStyles();

  const mimetype =
    getFileExtra(extra)?.mimetype || getS3FileExtra(extra)?.contenttype;
  const icon = getEmbeddedLinkExtra(extra)?.icons?.[0];

  if (icon) {
    return <img className={classes.imageIcon} alt={name} src={icon} />;
  }

  let Icon = InsertDriveFileIcon;
  switch (type) {
    case ITEM_TYPES.FOLDER:
      Icon = FolderIcon;
      break;
    case ITEM_TYPES.SHORTCUT:
      Icon = ShortcutIcon;
      break;
    case ITEM_TYPES.DOCUMENT: {
      Icon = DescriptionIcon;
      break;
    }
    case ITEM_TYPES.FILE:
    case ITEM_TYPES.S3_FILE: {
      if (MIME_TYPES.IMAGE.includes(mimetype)) {
        Icon = ImageIcon;
        break;
      }
      if (MIME_TYPES.VIDEO.includes(mimetype)) {
        Icon = MovieIcon;
        break;
      }
      if (MIME_TYPES.AUDIO.includes(mimetype)) {
        Icon = MusicNoteIcon;
        break;
      }
      if (MIME_TYPES.PDF.includes(mimetype)) {
        Icon = PictureAsPdfIcon;
        break;
      }

      Icon = InsertDriveFileIcon;
      break;
    }
    case ITEM_TYPES.LINK: {
      Icon = LinkIcon;
      break;
    }
    default:
      break;
  }

  return <Icon style={{ color: ITEMS_TABLE_ROW_ICON_COLOR, fontSize: size }} />;
};

ItemIcon.propTypes = {
  size: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  extra: PropTypes.oneOfType([
    PropTypes.shape({
      [ITEM_TYPES.FILE]: fileExtraPropTypes,
    }),
    PropTypes.shape({
      [ITEM_TYPES.S3_FILE]: s3FileExtraPropTypes,
    }),
    PropTypes.shape({
      [ITEM_TYPES.LINK]: linkExtraPropTypes,
    }),
  ]).isRequired,
};

ItemIcon.defaultProps = {
  size: 'default',
};

export default ItemIcon;
