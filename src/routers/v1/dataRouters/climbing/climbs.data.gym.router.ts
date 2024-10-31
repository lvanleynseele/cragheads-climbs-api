import express from 'express';
import gymSuccessRateService from '../../../../services/v1/ClimbData/GymClimbData/gym.successRate.service';
import climbDataGeneralService from '../../../../services/v1/ClimbData/General/data.climb.general.service';
import gymAvgDataDifficultyService from '../../../../services/v1/ClimbData/GymClimbData/gym.difficulty.service';

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

gymDataRouter.get('/type-breakdown/:userId/:timeframe', async (req, res) => {
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
    const data = await climbDataGeneralService.gymClimbsByType(
      userId,
      timeframe,
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

gymDataRouter.get('/avg-difficulty/:userId/:timeframe', async (req, res) => {
  try {
    const userId = req.params.userId;
    const timeframe = req.params.timeframe;

    let data: any;

    switch (timeframe) {
      case 'month':
        data = await gymAvgDataDifficultyService.getClimbsDifficultyMonth(
          userId,
        );
        break;
      case '6 months':
        data = await gymAvgDataDifficultyService.getClimbsDifficulty6Month(
          userId,
        );
        break;
      case 'year':
        data = await gymAvgDataDifficultyService.getClimbsDifficultyYear(
          userId,
        );
        break;
      default:
        data = await gymAvgDataDifficultyService.getClimbsDifficultyAllTime(
          userId,
        );
        break;
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default gymDataRouter;
