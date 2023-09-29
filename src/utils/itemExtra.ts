import { ItemType } from '@graasp/sdk';
import PropTypes from 'prop-types';

export const getFileExtra = (extra) => extra?.[ItemType.LOCAL_FILE];

export const buildFileExtra = (file) => ({ [ItemType.LOCAL_FILE]: file });

export const getS3FileExtra = (extra) => extra?.[ItemType.S3_FILE];

export const buildS3FileExtra = (s3File) => ({ [ItemType.S3_FILE]: s3File });

export const getEmbeddedLinkExtra = (extra) => extra?.[ItemType.LINK];

export const buildEmbeddedLinkExtra = (embeddedLink) => ({
  [ItemType.LINK]: embeddedLink,
});

export const buildShortcutExtra = (target) => ({
  [ItemType.SHORTCUT]: { target },
});

export const getShortcutTarget = (extra) =>
  extra?.[ItemType.SHORTCUT]?.target;

export const fileExtraPropTypes = PropTypes.shape({
  mimetype: PropTypes.string.isRequired,
});

export const s3FileExtraPropTypes = PropTypes.shape({
  contenttype: PropTypes.string.isRequired,
});

export const linkExtraPropTypes = PropTypes.shape({
  icons: PropTypes.arrayOf(PropTypes.string),
});

export const buildItemLoginSchemaExtra = (schema) => {
  if (schema) {
    return {
      itemLogin: { loginSchema: schema },
    };
  }

  // remove setting
  return {
    itemLogin: {},
  };
};

export const getItemLoginExtra = (extra) => extra?.itemLogin;

export const getItemLoginSchema = (extra) =>
  getItemLoginExtra(extra)?.loginSchema;

export const buildDocumentExtra = (text) => ({
  [ItemType.DOCUMENT]: text,
});

export const getDocumentExtra = (extra) => extra?.[ItemType.DOCUMENT];

export const buildAppExtra = ({ url, settings = {} }) => ({
  [ItemType.APP]: { url, settings },
});

export const getAppExtra = (extra) => extra?.[ItemType.APP];
