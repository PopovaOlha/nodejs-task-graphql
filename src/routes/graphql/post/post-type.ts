import { GraphQLObjectType, GraphQLString } from 'graphql';

import { UUIDType } from '../types/uuid.js';
import { UserType } from '../user/user-type.js';
import { ContextInterface } from '../types/ContextInterface.js';
import { Post } from '../types/Post.js';

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: UserType,
      resolve: async ({ authorId }: Post, _args, { db }: ContextInterface) =>
        await db.user.findFirst({ where: { id: authorId } }),
    },
  }),
});
