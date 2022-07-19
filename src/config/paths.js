export const HOME_PATH = '/';
export const ITEMS_PATH = '/items';
export const MEMBERS_PATH = '/members';
export const PERMISSIONS_PATH = '/permissions';
export const ADMIN_PROFILE_PATH = '/profile';
export const ADMINS_PATH = '/admins';
export const ORGANIZATIONS_PATH = '/organizations';
export const PROJECTS_PATH = '/projects';
export const SAMPLE_PROFILE_PATH = '/sample-profile';
export const COLLECTIONS_PATH = '/collections';
export const ENVIRONMENTS_PATH = '/environments';
export const STATUS_PATH = '/status';
export const HEALTHCHECKS_PATH = '/healthchecks';
export const TESTS_PATH = '/tests';
export const buildItemPath = (id = ':itemId') => `${ITEMS_PATH}/${id}`;
export const buildMemberPath = (id = ':memberId') => `${MEMBERS_PATH}/${id}`;
export const buildAdminPath = (id = ':adminId') => `${ADMINS_PATH}/${id}`;
export const buildOrganizationPath = (id = ':organizationId') =>
  `${ORGANIZATIONS_PATH}/${id}`;
export const buildProjectPath = (id = ':projectId') => `${PROJECTS_PATH}/${id}`;
export const buildPermissionPath = (id = ':adminId') => `${ADMINS_PATH}/${id}`;
export const buildCollectionPath = (id = ':collectionId') =>
  `${COLLECTIONS_PATH}/${id}`;
export const buildEnvironmentPath = (name = ':environmentName') =>
  `${ENVIRONMENTS_PATH}/${name}`;
