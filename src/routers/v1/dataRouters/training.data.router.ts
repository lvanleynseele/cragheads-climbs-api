import express from 'express';
import outdoorDataRouter from './climbs.data.outdoor.router';
import gymDataRouter from './climbs.data.gym.router';

const trainingDataRouter = express.Router();
trainingDataRouter.use(express.json());

trainingDataRouter.use('/outdoor', outdoorDataRouter); //TODO: replace with main data router
trainingDataRouter.use('/gym', gymDataRouter);

export default trainingDataRouter;
