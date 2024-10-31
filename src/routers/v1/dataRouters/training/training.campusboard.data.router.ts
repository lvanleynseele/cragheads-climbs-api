import express from 'express';
import hangProgressionService from '../../../../services/v1/TrainingData/data.hangs.progression.service';

const campusboardDataRouter = express.Router();
campusboardDataRouter.use(express.json());

campusboardDataRouter.get(
  '/progression/:profileId/:timeframe',
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
          data = await hangProgressionService.campusboardTimePerMonth(
            profileId,
          );
          break;
        case '6 months':
          data = await hangProgressionService.camppusboardTimePer6Months(
            profileId,
          );
          break;
        case 'year':
          data = await hangProgressionService.campusboardTimePerYear(profileId);
          break;
        default:
          data = await hangProgressionService.campusboardTimePerAllTime(
            profileId,
          );
          break;
      }

      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  },
);

export default campusboardDataRouter;
