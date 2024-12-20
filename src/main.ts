import * as dotenv from 'dotenv';

import createServer, { hostname } from './server';
import logger from './utils/logger';
// import { registerSchedulers } from './utils/scheduler';
import mainRouter from './routers/v1/main.router';
import { intializeDB } from './database/db';

const port = process.env.PORT || 3010;

(async () => {
  try {
    const app = createServer();
    dotenv.config();
    app.listen(port, () => {
      logger.info(
        `Cragheads Climbs API Server started! Listening on port: ${port} on host: ${hostname}`,
      );
    });

    // infrastructure boot up
    await Promise.all([intializeDB()]);

    app.use('/v1', mainRouter);
  } catch (error) {
    logger.error(
      `Error starting server: ${error instanceof Error ? error.message : '-'}`,
    );
  }
})();
