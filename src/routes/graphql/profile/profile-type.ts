import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';

import { UUIDType } from '../types/uuid.js';
import { UserType } from '../user/user-type.js';
import { MemberType, MemberTypeId } from '../member/member-type.js';
import { ContextInterface } from '../types/ContextInterface.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    userId: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve: async ({ userId }, _args, { db }: ContextInterface) =>
        db.user.findFirst({ where: { id: userId } }),
    },
    memberTypeId: { type: MemberTypeId },
    memberType: {
      type: MemberType,
      resolve: async ({ memberTypeId }, _args, { loaders }: ContextInterface) =>
        await loaders.memberType.load(memberTypeId as string),
    },
  }),
});
