import express from 'express';
import legProgressionService from '../../../../services/v1/TrainingData/data.legs.progression.service';

const legDataRouter = express.Router();
legDataRouter.use(express.json());

legDataRouter.get('/progression/:profileId/:timeframe', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const timeframe = req.params.timeframe;
    if (!profileId || !timeframe) {
      res.status(400).send('profileId and timeframe are required');
    }
    let data: any;

    switch (timeframe) {
      case 'month':
        data = await legProgressionService.getLegsPerMonth(profileId);
        break;
      case '6 months':
        data = await legProgressionService.getLegsPer6Months(profileId);
        break;
      case 'year':
        data = await legProgressionService.getLegsPerYear(profileId);
        break;
      default:
        data = await legProgressionService.allTimeLegs(profileId);
        break;
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default legDataRouter;
