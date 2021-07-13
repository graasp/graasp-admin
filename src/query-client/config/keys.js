export const MEMBERS_KEY = 'members';
export const ITEMS_KEY = 'items';

export const CURRENT_MEMBER_KEY = 'currentMember';
export const ALL_MEMBERS_KEY = 'AllMembers';
export const ALL_ADMINS_KEY = 'AllAdmins';
export const buildMemberKey = (id) => [MEMBERS_KEY, id];

export const ALL_ITEMS_KEY = 'AllItems';
export const buildItemKey = (id) => [ITEMS_KEY, id];
