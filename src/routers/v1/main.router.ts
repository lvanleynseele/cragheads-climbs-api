import express from 'express';
import logger from '../../utils/logger';
import profileRouter from './profile.router';
import climbsRouter from './profile.climbs.router';

const mainRouter = express.Router();

mainRouter.use((req, res, next) => {
  logger.info(`Request URL [${req.method}] ${req.originalUrl}`);
  next();
});

profileRouter.use('/climbs', climbsRouter);

export default mainRouter;
