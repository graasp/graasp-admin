// we use this file because the backend does not have the api we need yet
import { List, Record } from 'immutable';

import itemData from '../data/itemData';
import memberData from '../data/membersData';

const MemberRecord = Record({
  id: 'mock-id',
  name: 'mock-name',
  email: 'mock-email',
  type: 'individual',
  extra: {},
  createdAt: '2021-06-01T11:50:30.859Z',
  updatedAt: '2021-06-01T11:50:30.859Z',
});

const ItemRecord = Record({
  id: 'mock-id',
  name: 'mock-name',
  creator: 'mock-creator',
  description: 'mock-description',
  type: 'folder',
  extra: {},
  createdAt: '2021-06-01T11:50:30.859Z',
  updatedAt: '2021-06-01T11:50:30.859Z',
});

export const useAdmins = () => ({
    data: List([
      MemberRecord({
        id: '72a64a54-11b5-4678-81d7-0bb194924e41',
        name: 'Hadi',
        email: 'doe@email.com',
        type: 'individual',
        extra: {},
        createdAt: '2021-06-01T11:50:30.859Z',
        updatedAt: '2021-06-01T11:50:30.859Z',
      }),
    ]),
    isLoading: false,
  });

export const useAllItems = () => ({ data: List(itemData), isLoading: false });

export const useAllValidationReviews = () => ({
    data: List(),
    isLoading: false,
  });

export const useAllMembers = () => ({
    data: List([
      MemberRecord({
        id: '72a64a54-11b5-4678-81d7-0bb194924e41',
        name: 'Hadi',
        email: 'doe@email.com',
        type: 'individual',
        extra: {},
        createdAt: '2021-06-01T11:50:30.859Z',
        updatedAt: '2021-06-01T11:50:30.859Z',
      }),
    ]),
    isLoading: false,
  });

export const useRolesPermissions = () => ({
    data: List(['read']),
    isLoading: false,
  });

export const useMembersRole = () => ({
    data: List(),
    isLoading: false,
  });

export const useMemberItems = () => ({
    data: List(),
    isLoading: false,
  });

export const useMember = () => ({
    data: MemberRecord({
      id: '72a64a54-11b5-4678-81d7-0bb194924e41',
      name: 'Hadi',
      email: 'doe@email.com',
      type: 'individual',
      extra: {},
      createdAt: '2021-06-01T11:50:30.859Z',
      updatedAt: '2021-06-01T11:50:30.859Z',
    }),
    isLoading: false,
  });

export const useItem = () => ({
    data: ItemRecord(itemData[0]),
    isLoading: false,
  });

export const useChildren = () => ({
    data: List([ItemRecord(itemData[1]), ItemRecord(itemData[2])]),
    isLoading: false,
  });

export const useParents = () => ({
    data: List([ItemRecord(itemData[3]), ItemRecord(itemData[4])]),
    isLoading: false,
  });

export const useItemMembers = () => ({
    data: List(memberData.map((m) => MemberRecord(m))),
    isLoading: false,
  });
