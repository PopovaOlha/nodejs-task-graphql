import { GraphQLBoolean } from 'graphql';

import { ProfileType } from './profile-type.js';
import { ChangeProfileInput, CreateProfileInput } from './inputs.js';
import { UUIDType } from '../types/uuid.js';
import { ContextInterface } from '../types/ContextInterface.js';

export const ProfileMutations = {
  createProfile: {
    type: ProfileType,
    args: { dto: { type: CreateProfileInput } },
    resolve: async (_, { dto }, { db }: ContextInterface) =>
      db.profile.create({ data: dto }),
  },

  changeProfile: {
    type: ProfileType,
    args: { id: { type: UUIDType }, dto: { type: ChangeProfileInput } },
    resolve: async (_, { id, dto }, { db }: ContextInterface) =>
      await db.profile.update({ where: { id }, data: dto }),
  },

  deleteProfile: {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    resolve: async (_, { id }, { db }: ContextInterface) => {
      try {
        await db.profile.delete({ where: { id } });
      } catch (err) {
        return false;
      }

      return true;
    },
  },
};
