export const HOME_PATH = '/';
export const ITEMS_PATH = '/items';
export const MEMBERS_PATH = '/members';
export const ADMIN_PROFILE = '/profile';
export const buildItemPath = (id = ':itemId') => `${ITEMS_PATH}/${id}`;
export const buildMemberPath = (id = ':memberId') => `${MEMBERS_PATH}/${id}`;
