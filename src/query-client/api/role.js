import {
  buildGetMemberRoles,
  buildGetRolePermission,
  OWN_ROLES_ROUTE,
} from './routes';
import { DEFAULT_GET, failOnError } from './utils';

export const getMemberRoles = async ({ id }, { API_HOST }) => {
  const res = await fetch(`${API_HOST}/${buildGetMemberRoles(id)}`, {
    ...DEFAULT_GET,
  }).then(failOnError);

  return res.json();
};

export const getOwnRoles = async ({ API_HOST }) => {
  const res = await fetch(`${API_HOST}/${OWN_ROLES_ROUTE}`, {
    ...DEFAULT_GET,
  }).then(failOnError);

  return res.json();
};

export const getRolePermissions = async ({ id }, { API_HOST }) => {
  const res = await fetch(`${API_HOST}/${buildGetRolePermission(id)}`, {
    ...DEFAULT_GET,
  }).then(failOnError);

  return res.json();
};

export const getRolesPermissions = async ({ ids }, config) => {
  if (ids.size) {
    return Promise.all(ids.map((id) => getRolePermissions({ id }, config)));
  }
  return [];
};

export const getMembersRoles = async ({ ids }, config) => {
  if (ids.size) {
    return Promise.all(ids.map((id) => getMemberRoles({ id }, config)));
  }
  return [];
};
