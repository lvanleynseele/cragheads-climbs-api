import express from 'express';
import outdoorSuccessRateService from '../../../services/v1/ClimbData/OutdoorClimbData/outdoor.successRate.service';

const outdoorDataRouter = express.Router();
outdoorDataRouter.use(express.json());

outdoorDataRouter.get(
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
      const data = await outdoorSuccessRateService.successRatePerDifficulty(
        userId,
        timeframe,
      );
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

outdoorDataRouter.get(
  '/success-rate/rock-type/:userId/:timeframe',
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
      const data = await outdoorSuccessRateService.successRatePerRockType(
        userId,
        timeframe,
      );
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

outdoorDataRouter.get(
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
      const data = await outdoorSuccessRateService.successRatePerMoveType(
        userId,
        timeframe,
      );
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

export default outdoorDataRouter;
