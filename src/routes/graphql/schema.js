import { makeExecutableSchema } from 'graphql-tools';

// Ваша схема GraphQL
const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, World!'
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;