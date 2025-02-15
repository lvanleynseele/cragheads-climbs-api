import * as dotenv from 'dotenv';

import createServer from './server';
import logger from './utils/logger';
// import { registerSchedulers } from './utils/scheduler';
import mainRouter from './routers/v1/main.router';
import { intializeDB } from './database/db';

const port = process.env.PORT || 3010;

(async () => {
  try {
    const app = createServer();
    dotenv.config();
    app.listen(port, '0.0.0.0', () => {
      logger.info(
        `Cragheads Climbs API Server started! Listening on port: ${port}`,
      );
    });

    // infrastructure boot up
    await intializeDB();

    app.use('/v1', mainRouter);
  } catch (error) {
    logger.error(
      `Error starting server: ${error instanceof Error ? error.message : '-'}`,
    );
  }
})();
