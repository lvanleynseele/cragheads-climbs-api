import express from 'express';
import trainingDataTimeService from '../../../services/v1/TrainingData/data.training.time.service';

const trainingDataRouter = express.Router();
trainingDataRouter.use(express.json());

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
