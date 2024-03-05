import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, GraphQLError, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

import { createGqlResponseSchema, gqlResponseSchema, gqlSchema } from './schemas.js';
import { createDataloader } from './loader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma: prismaClient } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      /** Validate  depthLimit*/
      {
        const errors: readonly GraphQLError[] = validate(
          gqlSchema,
          parse(req.body.query),
          [depthLimit(5)],
        );

        if (errors.length > 0) {
          return { data: '', errors };
        }
      }

      /** Create response */
      const { data, errors } = await graphql({
        schema: gqlSchema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: {
          db: prismaClient,
          loaders: createDataloader(prismaClient),
        },
      });

      return { data, errors };
    },
  });
};

export default plugin;
