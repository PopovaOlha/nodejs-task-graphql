import { GraphQLList, GraphQLResolveInfo } from 'graphql';
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

import { UserType } from './user-type.js';
import { UUIDType } from '../types/uuid.js';
import { ContextInterface } from '../types/ContextInterface.js';
import { User } from '../types/User.js';

export const UserQueries = {
  user: {
    type: UserType,
    args: { id: { type: UUIDType } },
    resolve: async (_, { id }: User, { loaders }: ContextInterface) =>
      await loaders.user.load(id),
  },

  users: {
    type: new GraphQLList(UserType),
    resolve: async (
      _parent,
      _args,
      { db, loaders }: ContextInterface,
      info: GraphQLResolveInfo,
    ) => {
      const parsedInfo = parseResolveInfo(info) as ResolveTree;

      const { fields } = simplifyParsedResolveInfoFragmentWithType(
        parsedInfo,
        info.returnType,
      );

      const userSubscribedTo = 'userSubscribedTo' in fields;

      const subscribedToUser = 'subscribedToUser' in fields;

      const users = await db.user.findMany({
        include: { userSubscribedTo, subscribedToUser },
      });

      users.forEach((user) => {
        loaders.user.prime(user.id, user);
      });

      return users;
    },
  },
};
