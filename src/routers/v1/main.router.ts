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
mainRouter.use('/climbs', climbsRouter);
mainRouter.use('/training', trainingRouter);

mainRouter.use('/data/climb', climbDataRouter);
mainRouter.use('/data/training', trainingDataRouter);

//TODO: get rid of this function
mainRouter.get('/profile', async (req, res) => {
  try {
    const response = await Profiles.find();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default mainRouter;
