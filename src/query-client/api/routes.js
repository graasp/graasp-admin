export const MEMBERS_ROUTE = 'members';
export const ITEMS_ROUTE = 'items';
export const ROLES_ROUTE = 'roles';
export const PERMISSIONS_ROUTE = 'permissions';
export const SIGN_OUT_ROUTE = 'logout';

// members routes
export const ALL_MEMBERS_ROUTE = `${MEMBERS_ROUTE}/all`;
export const ALL_ADMINS_ROUTE = `${MEMBERS_ROUTE}/admins`;
export const CURRENT_MEMBER_ROUTE = `${MEMBERS_ROUTE}/current`;
export const buildGetMember = (id) => `${MEMBERS_ROUTE}/${id}`;
export const buildGetMemberRoles = (id) =>
  `${MEMBERS_ROUTE}/${id}/${ROLES_ROUTE}`;
export const buildGetMemberItems = (id) => `${MEMBERS_ROUTE}/${id}/items`;
export const buildGetMemberPermissions = (id) =>
  `${MEMBERS_ROUTE}/${id}/${PERMISSIONS_ROUTE}`;
export const buildPostMemberRole = (id) => `${MEMBERS_ROUTE}/${id}/role`;
export const buildDeleteMemberRole = (id) => `${MEMBERS_ROUTE}/${id}/role`;

// items routes
export const ALL_ITEMS_ROUTE = `${ITEMS_ROUTE}/all`;
export const buildGetItem = (id) => `${ITEMS_ROUTE}/${id}`;
export const buildGetItemMembers = (id) => `${ITEMS_ROUTE}/${id}/members`;
export const buildGetChildrenRoute = (id) => `${ITEMS_ROUTE}/children/${id}`;
export const buildGetParentsRoute = (id) => `${ITEMS_ROUTE}/parents/${id}`;

// role routes
export const ALL_ROLES_ROUTE = `${ROLES_ROUTE}/all`;
export const OWN_ROLES_ROUTE = `${ROLES_ROUTE}/own`;
export const POST_ROLE_ROUTE = `${ROLES_ROUTE}/`;
export const buildGetRoute = (id) => `${ROLES_ROUTE}/${id}`;
export const buildDeleteRoute = (id) => `${ROLES_ROUTE}/${id}`;
export const buildPatchRoute = (id) => `${ROLES_ROUTE}/${id}`;
export const buildPostRolePermission = (id) =>
  `${ROLES_ROUTE}/${id}/permission`;
export const buildDeleteRolePermission = (id) =>
  `${ROLES_ROUTE}/${id}/permission`;

// permission routes

export const API_ROUTES = {
  ALL_ADMINS_ROUTE,
  ALL_ITEMS_ROUTE,
  ALL_MEMBERS_ROUTE,
  ALL_ROLES_ROUTE,
  CURRENT_MEMBER_ROUTE,
  OWN_ROLES_ROUTE,
  POST_ROLE_ROUTE,
  SIGN_OUT_ROUTE,
  buildGetItem,
  buildGetChildrenRoute,
  buildGetMember,
  buildGetMemberPermissions,
  buildGetMemberRoles,
  buildDeleteMemberRole,
  buildPostMemberRole,
  buildGetRoute,
  buildDeleteRoute,
  buildPatchRoute,
  buildPostRolePermission,
  buildDeleteRolePermission,
};
