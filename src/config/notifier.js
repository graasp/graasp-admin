import { toast } from 'react-toastify';
import { routines } from '@graasp/query-client';
import buildI18n from '@graasp/translations';

const i18n = buildI18n();

const {
  // TODO
  editItemMembershipRoutine,
  deleteItemMembershipRoutine,
  exportItemRoutine,
  uploadFileRoutine,
  editMemberRoutine,
} = routines;

export default ({ type, payload }) => {
  let message = null;
  switch (type) {
    // error messages
    case editItemMembershipRoutine.FAILURE:
    case deleteItemMembershipRoutine.FAILURE:
    case exportItemRoutine.FAILURE: {
      // todo: factor out string
      message = i18n.t(
        payload?.error?.response?.data?.message ??
          'An unexpected error occured',
      );
      break;
    }
    // success messages
    case uploadFileRoutine.SUCCESS:
    case editMemberRoutine.SUCCESS: {
      // todo: factor out string
      message = i18n.t(
        payload?.message ?? 'The operation successfully proceeded',
      );
      break;
    }
    default:
  }
  // error notification
  if (payload?.error && message) {
    toast.error(i18n.t(message));
  }
  // success notification
  else if (message) {
    toast.success(i18n.t(message));
  }
};
