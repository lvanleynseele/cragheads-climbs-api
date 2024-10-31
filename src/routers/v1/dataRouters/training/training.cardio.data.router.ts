import express from 'express';
import cardioProgressionService from '../../../../services/v1/TrainingData/data.cardio.progression.service';

const cardioDataRouter = express.Router();
cardioDataRouter.use(express.json());

cardioDataRouter.get('/progression/:profileId/:timeframe', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const timeframe = req.params.timeframe;
    if (!profileId || !timeframe) {
      res.status(400).send('profileId and timeframe are required');
    }
    let data: any;

    switch (timeframe) {
      case 'month':
        data = await cardioProgressionService.getCardioPerMonth(profileId);
        break;
      case '6 months':
        data = await cardioProgressionService.getCardioPer6Months(profileId);
        break;
      case 'year':
        data = await cardioProgressionService.getCardioPerYear(profileId);
        break;
      default:
        data = await cardioProgressionService.allTimeCardio(profileId);
        break;
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default cardioDataRouter;
