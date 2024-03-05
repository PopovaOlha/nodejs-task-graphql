import {
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLEnumType,
  } from 'graphql';
  
  import { ProfileType } from '../profile/profile-type.js';
  import { ContextInterface } from '../types/ContextInterface.js';
  import { Member } from '../types/Member.js';
  
  export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
      basic: { value: 'basic' },
      business: { value: 'business' },
    },
  });
  
  export const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
      id: { type: MemberTypeId },
      discount: { type: GraphQLFloat },
      postsLimitPerMonth: { type: GraphQLInt },
      profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async ({ id }: Member, _args, { db }: ContextInterface) => {
          await db.profile.findMany({ where: { memberTypeId: id } });
        },
      },
    }),
  });
  