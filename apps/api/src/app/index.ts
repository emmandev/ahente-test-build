import fastify from 'fastify';
import mercurius from 'mercurius';
import { getSchema } from './graphql';
import * as mongodb from './mongo';

export const start = async () => {
  await mongodb.start(process.env.DB_URL);

  const schema = await getSchema();

  const server = fastify({
    logger: true,
  });

  server.register(mercurius, {
    schema,
    graphiql: 'playground',
  });

  server.listen(process.env.PORT, '0.0.0.0', (error, address) => {
    if (error) {
      server.log.error(error);
      process.exit(1);
    }

    server.log.info(`Listening to ${address}`);
  });

  return server;
};

export const stop = async () => {
  await mongodb.stop();
};
