import env from '../env.json';
import {
  ITEM_DATA_TYPES,
  ITEM_LAYOUT_MODES,
  PERMISSION_LEVELS,
  UPLOAD_FILES_METHODS,
} from '../enums';

const {
  API_HOST: ENV_API_HOST,
  S3_FILES_HOST: ENV_S3_FILES_HOST,
  UPLOAD_METHOD: ENV_UPLOAD_METHOD,
  SHOW_NOTIFICATIONS: ENV_SHOW_NOTIFICATIONS,
  AUTHENTICATION_HOST: ENV_AUTHENTICATION_HOST,
  NODE_ENV: ENV_NODE_ENV,
  DOMAIN: ENV_DOMAIN,
} = env;

export const APP_NAME = 'Graasp Admin Panel';

export const ENV = {
  DEVELOPMENT: 'development',
};

export const NODE_ENV =
  ENV_NODE_ENV ||
  process.env.REACT_APP_NODE_ENV ||
  process.env.NODE_ENV ||
  ENV.DEVELOPMENT;

export const API_HOST =
  ENV_API_HOST || process.env.REACT_APP_API_HOST || 'http://localhost:3111';

export const S3_FILES_HOST =
  ENV_S3_FILES_HOST || process.env.REACT_APP_S3_FILES_HOST || 'localhost';

export const SHOW_NOTIFICATIONS =
  ENV_SHOW_NOTIFICATIONS ||
  process.env.REACT_APP_SHOW_NOTIFICATIONS === 'true' ||
  false;

export const AUTHENTICATION_HOST =
  ENV_AUTHENTICATION_HOST ||
  process.env.REACT_APP_AUTHENTICATION_HOST ||
  'http://localhost:3111';

export const DESCRIPTION_MAX_LENGTH = 30;

export const DEFAULT_IMAGE_SRC =
  'https://pbs.twimg.com/profile_images/1300707321262346240/IsQAyu7q_400x400.jpg';

export const ROOT_ID = 'root-id';

export const TREE_VIEW_MAX_WIDTH = 400;
export const UUID_LENGTH = 36;

export const MIME_TYPES = {
  IMAGE: ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'],
  VIDEO: ['video/mp4'],
  AUDIO: ['audio/mpeg', 'audio/mp3'],
  PDF: ['application/pdf'],
};
export const DRAWER_WIDTH = 300;
export const DEFAULT_LOCALE = 'en-US';

export const DEFAULT_PERMISSION_LEVEL = PERMISSION_LEVELS.WRITE;

export const PERMISSIONS_EDITION_ALLOWED = [
  PERMISSION_LEVELS.WRITE,
  PERMISSION_LEVELS.ADMIN,
];

export const DEFAULT_ITEM_LAYOUT_MODE = ITEM_LAYOUT_MODES.LIST;

export const ROWS_PER_PAGE_OPTIONS = [10, 25];

export const LEFT_MENU_WIDTH = 250;
export const RIGHT_MENU_WIDTH = 300;
export const HEADER_HEIGHT = 64;

export const FILE_UPLOAD_MAX_FILES = 5;
export const ITEMS_TABLE_ROW_ICON_COLOR = '#333333';

export const UPLOAD_METHOD =
  ENV_UPLOAD_METHOD ||
  process.env.REACT_APP_UPLOAD_METHOD ||
  UPLOAD_FILES_METHODS.DEFAULT;

export const ITEM_ICON_MAX_SIZE = 25;

export const USERNAME_MAX_LENGTH = 30;

export const SHARE_ITEM_MODAL_MIN_WIDTH = 120;

// React Query Configs
export const STALE_TIME_MILLISECONDS = 1000 * 60 * 60;
export const CACHE_TIME_MILLISECONDS = 1000 * 60 * 60;

export const LOADING_CONTENT = '…';
export const SETTINGS = {
  ITEM_LOGIN: {
    name: 'item-login',
    OPTIONS: {
      USERNAME: 'username',
      USERNAME_AND_PASSWORD: 'username+password',
    },
    SIGN_IN_MODE: {
      USERNAME: 'username',
      MEMBER_ID: 'memberId',
    },
  },
};

export const SETTINGS_ITEM_LOGIN_DEFAULT = SETTINGS.ITEM_LOGIN.OPTIONS.USERNAME;
export const SETTINGS_ITEM_LOGIN_SIGN_IN_MODE_DEFAULT =
  SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.USERNAME;

export const REDIRECT_URL_LOCAL_STORAGE_KEY = 'redirectUrl';

export const EMPTY_ROW_HEIGHT = 53;

export const TABLE_TYPES = {
  MEMBER: 'member',
  ITEM: 'item',
  PERMISSION: 'permission',
  ADMIN: 'admin',
};

export const memberHeadCell = [
  {
    id: 'name',
    numeric: false,
    label: 'Name',
    align: 'left',
  },
  {
    id: 'email',
    numeric: false,
    label: 'Email',
    align: 'right',
  },
  {
    id: 'type',
    numeric: false,
    label: 'Type',
    align: 'right',
  },
  {
    id: 'createdAt',
    numeric: false,
    label: 'Created At',
    align: 'right',
    type: ITEM_DATA_TYPES.DATE,
  },
  {
    id: 'updatedAt',
    numeric: false,
    label: 'Updated At',
    align: 'right',
    type: ITEM_DATA_TYPES.DATE,
  },
];

export const adminsHeadCell = [
  {
    id: 'name',
    numeric: false,
    label: 'Name',
    align: 'left',
  },
  {
    id: 'roles',
    numeric: false,
    label: 'Roles',
    align: 'center',
  },
  {
    id: 'email',
    numeric: false,
    label: 'Email',
    align: 'right',
  },
  {
    id: 'type',
    numeric: false,
    label: 'Type',
    align: 'right',
  },
  {
    id: 'createdAt',
    numeric: false,
    label: 'Created At',
    align: 'right',
    type: ITEM_DATA_TYPES.DATE,
  },
  {
    id: 'updatedAt',
    numeric: false,
    label: 'Updated At',
    align: 'right',
    type: ITEM_DATA_TYPES.DATE,
  },
];

export const itemHeadCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Name',
    align: 'left',
  },
  {
    id: 'type',
    numeric: false,
    label: 'Type',
    align: 'right',
  },
  {
    id: 'ownerName',
    numeric: false,
    label: 'Owner',
    align: 'right',
  },
  {
    id: 'createdAt',
    numeric: false,
    label: 'Created At',
    align: 'right',
    type: ITEM_DATA_TYPES.DATE,
  },
  {
    id: 'updatedAt',
    numeric: false,
    label: 'Updated At',
    align: 'right',
    type: ITEM_DATA_TYPES.DATE,
  },
];

export const permissionHeadCells = [
  {
    id: 'description',
    numeric: false,
    label: 'Description',
    align: 'left',
  },
  {
    id: 'endpoint',
    numeric: false,
    label: 'Endpoint',
    align: 'left',
  },
  {
    id: 'method',
    numeric: false,
    label: 'Method',
    align: 'left',
  },
];

export const AUTO_COMPLETE_WIDTH = 300;

export const MAX_WIDTH_LIST = 360;

export const DOMAIN = ENV_DOMAIN || process.env.REACT_APP_DOMAIN;

export const CATEGORY_CHIP_HEIGHT = 50;
export const CATEGORY_BUTTON_HEIGHT = 50;
export const CATEGORY_SELECT_WIDTH = 200;
