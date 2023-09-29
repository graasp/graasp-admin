import itemMembershipData from '../data/itemMembershipData';
import membersData from '../data/membersData';

export const getMembersByMemberships = (memberships) =>
  memberships.map((membership) =>
    membersData.find(({ id }) => membership.memberId === id),
  );

export const getMembershipsByMemberId = (_memberId) =>
  itemMembershipData.filter(({ memberId }) => memberId === _memberId);
