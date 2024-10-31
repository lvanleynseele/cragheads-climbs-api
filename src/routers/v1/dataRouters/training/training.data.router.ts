import express from 'express';
import trainingDataTimeService from '../../../../services/v1/TrainingData/data.training.time.service';
import armDataRouter from './training.arms.data.router';
import campusboardDataRouter from './training.campusboard.data.router copy 3';
import hangboardDataRouter from './training.hangboard.data.router';
import legDataRouter from './training.legs.data.router';
import cardioDataRouter from './training.cardio.data.router';

const trainingDataRouter = express.Router();
trainingDataRouter.use(express.json());

trainingDataRouter.use('/arms', armDataRouter);
trainingDataRouter.use('/campusboard', campusboardDataRouter);
trainingDataRouter.use('/carido', cardioDataRouter);
trainingDataRouter.use('/hangboard', hangboardDataRouter);
trainingDataRouter.use('/legs', legDataRouter);

trainingDataRouter.get(
  '/over-period/:profileId/:timeframe',
  async (req, res) => {
    try {
      const profileId = req.params.profileId;
      const timeframe = req.params.timeframe;
      if (!profileId || !timeframe) {
        res.status(400).send('profileId and timeframe are required');
      }
      let data: any;

      switch (timeframe) {
        case 'month':
          data = await trainingDataTimeService.getTrainsPerMonth(profileId);
          break;
        case '6 months':
          data = await trainingDataTimeService.getTrainsPer6Months(profileId);
          break;
        case 'year':
          data = await trainingDataTimeService.getTrainsPerYear(profileId);
          break;
        default:
          data = await trainingDataTimeService.allTimeTrains(profileId);
          break;
      }

      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

export default trainingDataRouter;
