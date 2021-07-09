import membersData from '../data/membersData';

const getMembersByMemberships = (memberships) =>
  memberships.map((membership) =>
    membersData.find(({ id }) => membership.memberId === id),
  );

export default getMembersByMemberships;
