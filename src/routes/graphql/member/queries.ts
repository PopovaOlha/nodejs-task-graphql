import { GraphQLList } from 'graphql';

import { MemberType, MemberTypeId } from './member-type.js';
import { ContextInterface } from '../types/ContextInterface.js';

export const MemberTypeQueries = {
  memberType: {
    type: MemberType,
    args: { id: { type: MemberTypeId } },
    resolve: async (_parent, { id }, { db }: ContextInterface) =>
      await db.memberType.findFirst({ where: { id } }),
  },

  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (_parent, _args, { db }: ContextInterface) =>
      await db.memberType.findMany(),
  },
};
