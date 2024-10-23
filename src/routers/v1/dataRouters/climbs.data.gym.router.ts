import express from 'express';
import gymSuccessRateService from '../../../services/v1/ClimbData/GymClimbData/gym.successRate.service';

const gymDataRouter = express.Router();
gymDataRouter.use(express.json());

gymDataRouter.get(
  '/success-rate/difficulty/:userId/:timeframe',
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const timeframe = req.params.timeframe as
        | 'month'
        | '6 months'
        | 'year'
        | 'all time';
      if (!['month', '6 months', 'year', 'all time'].includes(timeframe)) {
        return res.status(400).send('Invalid timeframe');
      }
      const data = await gymSuccessRateService.successRatePerDifficulty(
        userId,
        timeframe,
      );
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

gymDataRouter.get(
  '/success-rate/key-holds/:userId/:timeframe',
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const timeframe = req.params.timeframe as
        | 'month'
        | '6 months'
        | 'year'
        | 'all time';
      if (!['month', '6 months', 'year', 'all time'].includes(timeframe)) {
        return res.status(400).send('Invalid timeframe');
      }
      const data = await gymSuccessRateService.successRatePerKeyHolds(
        userId,
        timeframe,
      );
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

gymDataRouter.get(
  '/success-rate/key-move/:userId/:timeframe',
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const timeframe = req.params.timeframe as
        | 'month'
        | '6 months'
        | 'year'
        | 'all time';
      if (!['month', '6 months', 'year', 'all time'].includes(timeframe)) {
        return res.status(400).send('Invalid timeframe');
      }
      const data = await gymSuccessRateService.successRatePerMoveType(
        userId,
        timeframe,
      );
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

export default gymDataRouter;
