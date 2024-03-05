import { GraphQLList, GraphQLNonNull } from 'graphql';

import { UUIDType } from '../types/uuid.js';
import { PostType } from './post-type.js';
import { ContextInterface } from '../types/ContextInterface.js';

export const PostQueries = {
  post: {
    type: PostType,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_, { id }, { db }: ContextInterface) =>
      await db.post.findFirst({ where: { id: id } }),
  },

  posts: {
    type: new GraphQLList(PostType),
    resolve: async (_parent, _args, { db }: ContextInterface) => await db.post.findMany(),
  },
};
