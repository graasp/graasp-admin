export const HOME_PATH = '/';
export const ITEMS_PATH = '/items';
export const MEMBERS_PATH = '/members';
export const PERMISSIONS_PATH = '/permissions';
export const CATEGORIES_PATH = '/categories';
export const REPORTS_PATH = '/reports';
export const VALIDATIONS_PATH = '/validations';
export const ADMIN_PROFILE_PATH = '/profile';
export const ADMINS_PATH = '/admins';
export const buildItemPath = (id = ':itemId') => `${ITEMS_PATH}/${id}`;
export const buildMemberPath = (id = ':memberId') => `${MEMBERS_PATH}/${id}`;
export const buildAdminPath = (id = ':adminId') => `${ADMINS_PATH}/${id}`;
export const buildPermissionPath = (id = ':adminId') => `${ADMINS_PATH}/${id}`;
export const buildValidationPath = (
  validationId = ':validationId',
  itemId = ':itemId',
  reviewId = ':reviewId',
) => `${VALIDATIONS_PATH}/${validationId}/${itemId}/${reviewId}`;
