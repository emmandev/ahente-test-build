import { buildSchema } from 'type-graphql';
import { Agent, AgentResolver } from './agent';

export const getSchema = async () => {
  const schema = await buildSchema({
    emitSchemaFile: true,
    orphanedTypes: [Agent],
    resolvers: [AgentResolver],
  });

  return schema;
};
