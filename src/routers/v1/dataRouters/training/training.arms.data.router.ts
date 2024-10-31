import express from 'express';
import armsProgressionService from '../../../../services/v1/TrainingData/data.arms.progression.service';

const armDataRouter = express.Router();
armDataRouter.use(express.json());

armDataRouter.get('/progression/:profileId/:timeframe', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const timeframe = req.params.timeframe;
    if (!profileId || !timeframe) {
      res.status(400).send('profileId and timeframe are required');
    }
    let data: any;

    switch (timeframe) {
      case 'month':
        data = await armsProgressionService.getArmsPerMonth(profileId);
        break;
      case '6 months':
        data = await armsProgressionService.getArmsPer6Months(profileId);
        break;
      case 'year':
        data = await armsProgressionService.getArmsPerYear(profileId);
        break;
      default:
        data = await armsProgressionService.allTimeArms(profileId);
        break;
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default armDataRouter;
