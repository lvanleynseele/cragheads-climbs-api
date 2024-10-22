import express from 'express';
import outdoorSuccessRateService from '../../services/v1/ClimbData/OutdoorClimbData/outdoor.successRate.service';

const outdoorDataRouter = express.Router();
outdoorDataRouter.use(express.json());

outdoorDataRouter.get('/success-rate/difficulty/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await outdoorSuccessRateService.successRatePerDifficulty(
      userId,
      'all time',
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

outdoorDataRouter.get('/success-rate/rock-type/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await outdoorSuccessRateService.successRatePerRockType(userId);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

outdoorDataRouter.get('/success-rate/key-move/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await outdoorSuccessRateService.successRatePerMoveType(userId);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default outdoorDataRouter;
