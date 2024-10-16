import express from 'express';
import logger from '../../utils/logger';
import climbsRouter from './climbs.router';
import Profiles from '../../Models/Profile/Profile';

const mainRouter = express.Router();

mainRouter.use((req, res, next) => {
  logger.info(`Request URL [${req.method}] ${req.originalUrl}`);
  next();
});

mainRouter.use('/climbs', climbsRouter);

mainRouter.get('/profile', async (req, res) => {
  try {
    const response = await Profiles.find();
    console.log(new Date());

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default mainRouter;
