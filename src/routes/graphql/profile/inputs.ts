import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
  } from 'graphql';
  
  import { UUIDType } from '../types/uuid.js';
  import { MemberTypeId } from '../member/member-type.js';
  
  export const CreateProfileInput = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    fields: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
      yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
      memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    },
  });
  
  export const ChangeProfileInput = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: {
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
      memberTypeId: { type: MemberTypeId },
    },
  });
  