import express from 'express';
import logger from '../../utils/logger';
import climbsRouter from './climbs.router';
import Profiles from '../../Models/Profile/Profile';
import trainingRouter from './training.router';
import trainingDataRouter from './dataRouters/training/training.data.router';
import climbDataRouter from './dataRouters/climbing/climbs.data.router';

const mainRouter = express.Router();

mainRouter.use((req, res, next) => {
  logger.info(`Request URL [${req.method}] ${req.originalUrl}`);
  next();
});

mainRouter.use(express.json());

mainRouter.get('/health', async (req, res) => {
  try {
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    logger.error('Health check failed', error);
    res.status(500).json({ status: 'error', message: 'Health check failed' });
  }
});
mainRouter.use('/climbs', climbsRouter);
mainRouter.use('/training', trainingRouter);

mainRouter.use('/data/climb', climbDataRouter);
mainRouter.use('/data/training', trainingDataRouter);

export default mainRouter;
