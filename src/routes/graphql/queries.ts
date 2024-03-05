import { GraphQLObjectType } from 'graphql/index.js';

import { UserQueries } from './user/queries.js';
import { PostQueries } from './post/queries.js';
import { ProfileQueries } from './profile/gueries.js';
import { MemberTypeQueries } from './member/queries.js';

export const gqlQueries = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...UserQueries,
    ...PostQueries,
    ...ProfileQueries,
    ...MemberTypeQueries,
  }),
});
