import { failOnError, DEFAULT_GET } from './utils';
import {
  ALL_ADMINS_ROUTE,
  ALL_MEMBERS_ROUTE,
  buildGetMember,
  buildGetMemberItems,
  CURRENT_MEMBER_ROUTE,
} from './routes';

export const getMember = async ({ id }, { API_HOST }) => {
  const res = await fetch(`${API_HOST}/${buildGetMember(id)}`, {
    ...DEFAULT_GET,
  }).then(failOnError);
  return res.json();
};

export const getItemsOfMember = async ({ id }, { API_HOST }) => {
  const res = await fetch(`${API_HOST}/${buildGetMemberItems(id)}`, {
    ...DEFAULT_GET,
  }).then(failOnError);
  return res.json();
};

export const getCurrentMember = async ({ API_HOST }) => {
  const res = await fetch(`${API_HOST}/${CURRENT_MEMBER_ROUTE}`, {
    ...DEFAULT_GET,
  }).then(failOnError);

  return res.json();
};

export const getAllMembers = async ({ API_HOST }) => {
  const res = await fetch(`${API_HOST}/${ALL_MEMBERS_ROUTE}`, {
    ...DEFAULT_GET,
  }).then(failOnError);

  return res.json();
};

export const getAdmins = async ({ API_HOST }) => {
  const res = await fetch(`${API_HOST}/${ALL_ADMINS_ROUTE}`, {
    ...DEFAULT_GET,
  }).then(failOnError);

  return res.json();
};

//
// export const editMember = async (
//   { id, member, API_HOST }
// ) => {
//   const res = await fetch(`${API_HOST}/${buildPatchMember(id)}`, {
//     ...DEFAULT_PATCH,
//     body: JSON.stringify(member),
//   }).then(failOnError);
//
//   return res.json();
// };
