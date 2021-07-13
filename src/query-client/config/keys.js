export const MEMBERS_KEY = 'members';
export const ITEMS_KEY = 'items';
export const ROLES_KEY = 'roles';
export const PERMISSIONS_KEY = 'permissions';

export const CURRENT_MEMBER_KEY = 'currentMember';
export const ALL_MEMBERS_KEY = 'AllMembers';
export const ALL_ADMINS_KEY = 'AllAdmins';
export const buildMemberKey = (id) => [MEMBERS_KEY, id];
export const buildMemberItemsKey = (id) => [MEMBERS_KEY, id, 'items'];

export const ALL_ITEMS_KEY = 'AllItems';
export const buildItemKey = (id) => [ITEMS_KEY, id];
export const buildItemChildrenKey = (id) => [ITEMS_KEY, id, 'children'];
export const buildItemParentsKey = (id) => [ITEMS_KEY, id, 'parents'];
export const buildItemMembersKey = (id) => [ITEMS_KEY, id, 'members'];

export const OWN_ROLES_KEY = [ROLES_KEY, 'own'];
export const buildRoleKey = (id) => [ROLES_KEY, id];
export const buildMemberRoleKey = (id) => [ROLES_KEY, id, 'members'];
export const buildRolePermissionKey = (id) => [ROLES_KEY, id, 'permissions'];
export const buildRolesPermissionsKey = (ids) => [PERMISSIONS_KEY, ids];

export const OWN_PERMISSIONS_KEY = [PERMISSIONS_KEY, 'own'];
export const buildPermissionKey = (id) => [PERMISSIONS_KEY, id];
