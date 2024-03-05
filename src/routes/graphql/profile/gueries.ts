import { GraphQLList } from 'graphql';

import { ProfileType } from './profile-type.js';
import { UUIDType } from '../types/uuid.js';
import { ContextInterface } from '../types/ContextInterface.js';

export const ProfileQueries = {
  profile: {
    type: ProfileType,
    args: { id: { type: UUIDType } },
    resolve: async (_parent, { id }, { db }: ContextInterface) =>
      await db.profile.findFirst({ where: { id } }),
  },

  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (_parent, _args, { db }: ContextInterface) =>
      await db.profile.findMany({}),
  },
};
