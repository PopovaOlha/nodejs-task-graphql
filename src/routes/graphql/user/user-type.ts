import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../profile/profile-type.js';
import { PostType } from '../post/post-type.js';
import { ContextInterface } from '../types/ContextInterface.js';
import { User } from '../types/User.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }: User, _args, { loaders }: ContextInterface) =>
        await loaders.profile.load(id),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, _args, { loaders }: ContextInterface) =>
        await loaders.post.load(id),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (
        { userSubscribedTo }: User,
        _args,
        { loaders }: ContextInterface,
      ) => {
        if (Array.isArray(userSubscribedTo) && userSubscribedTo.length > 0) {
          return loaders.user.loadMany(userSubscribedTo.map(({ authorId }) => authorId));
        }

        return null;
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (
        { subscribedToUser }: User,
        _args,
        { loaders }: ContextInterface,
      ) => {
        if (Array.isArray(subscribedToUser) && subscribedToUser.length > 0) {
          return loaders.user.loadMany(
            subscribedToUser.map(({ subscriberId }) => subscriberId),
          );
        }

        return null;
      },
    },
  }),
});
