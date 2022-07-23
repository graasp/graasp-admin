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

export const PAT = process.env.REACT_APP_PAT;

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
  {
    id: 'actions',
    numeric: false,
    label: 'Actions',
    align: 'center',
    type: ITEM_DATA_TYPES.ACTIONS,
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

export const environmentHeadCells = [
  {
    id: 'repository',
    numeric: false,
    label: 'Repository',
    align: 'left',
  },
  {
    id: 'version',
    numeric: false,
    label: 'Version',
    align: 'right',
  },
  {
    id: 'actions',
    numeric: false,
    label: 'Actions',
    align: 'right',
  },
];

export const versionsFileHeadCells = [
  {
    id: 'name',
    numeric: false,
    label: 'File Name',
    align: 'left',
  },
  {
    id: 'actions',
    numeric: false,
    label: 'Actions',
    align: 'right',
  },
];

export const organizationsHeadCells = [
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
  {
    id: 'actions',
    numeric: false,
    label: 'Actions',
    align: 'center',
    type: ITEM_DATA_TYPES.ACTIONS,
  },
];

export const projectsHeadCells = [
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
  {
    id: 'actions',
    numeric: false,
    label: 'Actions',
    align: 'center',
    type: ITEM_DATA_TYPES.ACTIONS,
  },
];

export const collectionsHeadCells = [
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
    id: 'creator',
    numeric: false,
    label: 'Creator',
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
  {
    id: 'actions',
    numeric: false,
    label: 'Actions',
    align: 'center',
    type: ITEM_DATA_TYPES.ACTIONS,
  },
];

export const AUTO_COMPLETE_WIDTH = 300;

export const MAX_WIDTH_LIST = 360;

export const mockMembers = [
  {
    id: '123',
    name: 'A',
    type: 'individual',
    createdAt: '2022-04-01T14:09:23.743Z',
    updatedAt: '2022-04-13T14:09:23.743Z',
    email: 'A@graasp.org',
  },
  {
    id: '456',
    name: 'B',
    type: 'individual',
    createdAt: '2022-04-10T14:09:23.743Z',
    updatedAt: '2022-04-14T14:09:23.743Z',
    email: 'B@graasp.org',
  },
];

export const mockAdmins = [
  {
    id: '1234',
    name: 'admin1',
    roles: 'admin',
    createdAt: '2022-04-01T14:09:23.743Z',
    updatedAt: '2022-04-13T14:09:23.743Z',
    email: 'HUN4S@graasp.org',
    type: 'individual',
  },
  {
    id: '12345',
    name: 'admin2',
    roles: 'admin',
    createdAt: '2022-04-10T14:09:23.743Z',
    updatedAt: '2022-04-14T14:09:23.743Z',
    email: 'HUN4S@graasp.org',
    type: 'individual',
  },
];

export const mockOrganizations = [
  {
    id: '1234',
    name: 'GVA',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'gva@graasp.org',
  },
  {
    id: '1235',
    name: 'LYON',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'lyon@graasp.org',
  },
  {
    id: '1236',
    name: 'LYON',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'lyon@graasp.org',
  },
  {
    id: '1237',
    name: 'LYON',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'lyon@graasp.org',
  },
  {
    id: '1233',
    name: 'LYON',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'lyon@graasp.org',
  },
  {
    id: '12333',
    name: 'LYON',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'lyon@graasp.org',
  },
  {
    id: '123333',
    name: 'LYON',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'lyon@graasp.org',
  },
  {
    id: '1233333',
    name: 'LYON',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'lyon@graasp.org',
  },
  {
    id: '12333333',
    name: 'LYON',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'lyon@graasp.org',
  },
  {
    id: '123333333',
    name: 'LYON',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'lyon@graasp.org',
  },
  {
    id: '1233333333',
    name: 'LYON',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'lyon@graasp.org',
  },
];

export const mockProjects = [
  {
    id: '1234',
    name: 'HUB4S',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'HUN4S@graasp.org',
  },
  {
    id: '1235',
    name: 'GRAASP',
    type: 'org',
    updatedAt: '2022-01-01',
    createdAt: '2022-01-01',
    email: 'graasp@graasp.org',
  },
];

export const mockCollections = [
  {
    id: '0e9c88a2-abfd-488a-98c9-ee140e080444',
    name: "Modélisation en physique: un dispositif d'enseignement mi-fini",
    description:
      '<h4><span style="color: rgb(0, 71, 178);">Ce dispositif s\'adresse aux enseignant·e·s</span></h4><p><br></p><p><span style="color: rgb(0, 71, 178);">Cet environnement Graasp est structuré pour fonctionner comme un dispositif d\'enseignement à mettre en oeuvre dans sa ou ses classes, à adapter à ses usages et à ses objectifs, à développer puis partager avec d\'autres enseignant·e·s.</span></p><p><br></p><h4><span style="color: rgb(0, 71, 178);">Ce dispositif est mi-fini (</span><em style="color: rgb(0, 71, 178);">half-baked</em><span style="color: rgb(0, 71, 178);">)</span></h4><p><br></p><p><span style="color: rgb(0, 71, 178);">La structure prédéfinie de ce </span><em style="color: rgb(0, 71, 178);">template</em><span style="color: rgb(0, 71, 178);"> peut être enrichie de modifications et d\'ajouts par ses utilisateurs, qui participent ainsi à sa conception. Les copies et variantes du dispositif, initialement </span><em style="color: rgb(0, 71, 178);">mi-fini</em><span style="color: rgb(0, 71, 178);">, permettent son adaptation à de multiples contextes et la mémoire des divers usages, de manière à colporter l\'expérience grâce aux traces laissées par chacun·e, et partager les usages du dispositif.</span></p>',
    type: 'folder',
    path: '0e9c88a2-abfd-488a-98c9-ee140e080444',
    creator: '42fc200f-0ed7-4e02-9f78-65f5452b618c',
    updatedAt: '2022-06-03T08:00:13.918Z',
    createdAt: '2022-06-03T07:59:18.311Z',
    settings: { hasThumbnail: true, ccLicenseAdaption: 'alike' },
    extra: {
      folder: {
        childrenOrder: [
          'a1ad77e7-5c88-4050-a5cc-21ef129dc5cb',
          'bdfbae1f-1d96-439f-a69d-6aeb216bdd4c',
          '00b608fd-dfdd-4959-b703-941c7842568b',
          '4a5fdaa7-c204-4741-929f-e8f75fda05f3',
          'f7b3ea31-bf26-47c1-b868-44ebd81c4090',
          'a2ba1213-367a-4e3a-98b8-e858a99d1afc',
          'b6cf91a9-4df7-4cec-8a8c-043b62d44266',
        ],
      },
    },
  },
  {
    id: '11908be7-a968-4185-aba3-8c8bc0488bbd',
    name: 'Data Literacy',
    description: '<p>Data Literacy:</p><p>Ethical Literacy</p>',
    type: 'folder',
    path: '11908be7_a968_4185_aba3_8c8bc0488bbd',
    extra: {},
    creator: '81c0983d-db6c-4319-afa6-bcc9bace16f6',
    createdAt: '2022-06-21T13:30:44.542Z',
    updatedAt: '2022-06-21T13:57:47.026Z',
    settings: {
      tags: ['literacy', 'digitalskills', 'dataliteracy'],
      hasThumbnail: false,
      ccLicenseAdaption: 'allow',
    },
  },
];

export const mockSingleCollection = {
  id: '0e9c88a2-abfd-488a-98c9-ee140e080444',
  name: "Modélisation en physique: un dispositif d'enseignement mi-fini",
  description:
    '<h4><span style="color: rgb(0, 71, 178);">Ce dispositif s\'adresse aux enseignant·e·s</span></h4><p><br></p><p><span style="color: rgb(0, 71, 178);">Cet environnement Graasp est structuré pour fonctionner comme un dispositif d\'enseignement à mettre en oeuvre dans sa ou ses classes, à adapter à ses usages et à ses objectifs, à développer puis partager avec d\'autres enseignant·e·s.</span></p><p><br></p><h4><span style="color: rgb(0, 71, 178);">Ce dispositif est mi-fini (</span><em style="color: rgb(0, 71, 178);">half-baked</em><span style="color: rgb(0, 71, 178);">)</span></h4><p><br></p><p><span style="color: rgb(0, 71, 178);">La structure prédéfinie de ce </span><em style="color: rgb(0, 71, 178);">template</em><span style="color: rgb(0, 71, 178);"> peut être enrichie de modifications et d\'ajouts par ses utilisateurs, qui participent ainsi à sa conception. Les copies et variantes du dispositif, initialement </span><em style="color: rgb(0, 71, 178);">mi-fini</em><span style="color: rgb(0, 71, 178);">, permettent son adaptation à de multiples contextes et la mémoire des divers usages, de manière à colporter l\'expérience grâce aux traces laissées par chacun·e, et partager les usages du dispositif.</span></p>',
  type: 'folder',
  path: '0e9c88a2-abfd-488a-98c9-ee140e080444',
  creator: '42fc200f-0ed7-4e02-9f78-65f5452b618c',
  updatedAt: '2022-06-03T08:00:13.918Z',
  createdAt: '2022-06-03T07:59:18.311Z',
  settings: { hasThumbnail: true, ccLicenseAdaption: 'alike' },
  extra: {
    folder: {
      childrenOrder: [
        'a1ad77e7-5c88-4050-a5cc-21ef129dc5cb',
        'bdfbae1f-1d96-439f-a69d-6aeb216bdd4c',
        '00b608fd-dfdd-4959-b703-941c7842568b',
        '4a5fdaa7-c204-4741-929f-e8f75fda05f3',
        'f7b3ea31-bf26-47c1-b868-44ebd81c4090',
        'a2ba1213-367a-4e3a-98b8-e858a99d1afc',
        'b6cf91a9-4df7-4cec-8a8c-043b62d44266',
      ],
    },
  },
};

export const mockSingleCollectionItems = [
  {
    id: 'a1ad77e7-5c88-4050-a5cc-21ef129dc5cb',
    name: 'Introduction',
    description:
      '<h3><span style="color: rgb(0, 71, 178);">Bienvenue !</span></h3><p><span style="color: rgb(0, 71, 178);">&nbsp;</span></p><p><span style="color: rgb(0, 71, 178);">Ceci est un&nbsp;</span><strong style="color: rgb(0, 71, 178);"><em>dispositif d’enseignement mi-fini</em></strong><span style="color: rgb(0, 71, 178);">&nbsp;: à vous de le reprendre et de le travailler comme vous le souhaitez avec vos élèves !</span></p><p><span style="color: rgb(0, 71, 178);">&nbsp;</span></p><p><span style="color: rgb(0, 71, 178);">Notre objectif est de vous fournir des outils, ressources et propositions pour travailler la&nbsp;</span><strong style="color: rgb(0, 71, 178);"><em>modélisation</em></strong><span style="color: rgb(0, 71, 178);">&nbsp;avec vos élèves en physique (ou en sciences de la nature).</span></p><p><span style="color: rgb(0, 71, 178);">&nbsp;</span></p><p><span style="color: rgb(0, 71, 178);">Il n’y a pas de livre du maître ni de livre de l’élève, mais un ensemble de choses dont les usages sont tantôt définis, tantôt laissés à votre choix.</span></p><p><br></p><p><span style="color: rgb(0, 71, 178);">Vous trouverez ici les finalités du dispositif d\'enseignement mi-fini, les références théoriques, observations et réflexions à l\'origine de sa conception.</span></p>',
    type: 'folder',
    path:
      '0e9c88a2_abfd_488a_98c9_ee140e080444.a1ad77e7_5c88_4050_a5cc_21ef129dc5cb',
    extra: {
      folder: {
        childrenOrder: [
          'eeaad4e7-2c88-45e9-9d72-c0ba5058a328',
          '9f1b4b91-97c5-4623-97dd-339335bead23',
          '0591a863-2cb7-4170-94a3-c62491addd50',
        ],
      },
    },
    creator: '42fc200f-0ed7-4e02-9f78-65f5452b618c',
    createdAt: '2022-06-03T07:59:18.311Z',
    updatedAt: '2022-06-03T08:02:10.852Z',
    settings: {
      hasThumbnail: true,
    },
  },
  {
    id: 'bdfbae1f-1d96-439f-a69d-6aeb216bdd4c',
    name: 'Séquences',
    description:
      '<p><span style="color: rgb(0, 71, 178);">Vous trouverez ici des séquences organisées, dont les enchaînements ont été pensés en fonction de la progression des élèves dans leurs apprentissages (prérequis, etc.).</span></p>',
    type: 'folder',
    path:
      '0e9c88a2_abfd_488a_98c9_ee140e080444.bdfbae1f_1d96_439f_a69d_6aeb216bdd4c',
    extra: {
      folder: {
        childrenOrder: [
          'e4668bb9-5ddc-4e06-88ef-1f649bee971a',
          '3275a489-053a-4c89-a17f-3eea670f6d1c',
          '1018bcf9-4c56-4b19-8b5e-5564828ea3eb',
        ],
      },
    },
    creator: '42fc200f-0ed7-4e02-9f78-65f5452b618c',
    createdAt: '2022-06-03T07:59:18.311Z',
    updatedAt: '2022-06-03T09:23:02.989Z',
    settings: {
      hasThumbnail: true,
    },
  },
];
