import express from 'express';
import outdoorDataRouter from './climbs.data.outdoor.router';
import gymDataRouter from './climbs.data.gym.router';
import climbDataGeneralService from '../../../../services/v1/ClimbData/General/data.climb.general.service';
import climbsDataTimeService from '../../../../services/v1/ClimbData/General/data.climbs.time.service';

const climbDataRouter = express.Router();
climbDataRouter.use(express.json());

climbDataRouter.use('/outdoor', outdoorDataRouter); //TODO: replace with main data router
climbDataRouter.use('/gym', gymDataRouter);

climbDataRouter.get('/places-climbed/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    if (!profileId) {
      res.status(400).send('profileId is required');
    }

    const data = await climbDataGeneralService.placesClimbed(profileId);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//true == gym, false == outdoor
climbDataRouter.get('/gym-vs-outdoor/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    if (!profileId) {
      res.status(400).send('profileId is required');
    }

    const data = await climbDataGeneralService.gymVsOutdoor(profileId);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbDataRouter.get('/friends-climbed-with/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    if (!profileId) {
      res.status(400).send('profileId is required');
    }

    const data = await climbDataGeneralService.friendsClimbedWith(profileId);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbDataRouter.get('/over-period/:profileId/:timeframe', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const timeframe = req.params.timeframe;
    if (!profileId || !timeframe) {
      res.status(400).send('profileId and timeframe are required');
    }
    let data: any;

    switch (timeframe) {
      case 'month':
        data = await climbsDataTimeService.getClimbsPerMonth(profileId);
        break;
      case '6 months':
        data = await climbsDataTimeService.getClimbsPer6Months(profileId);
        break;
      case 'year':
        data = await climbsDataTimeService.getClimbsPerYear(profileId);
        break;
      default:
        data = await climbsDataTimeService.allTimeClimbs(profileId);
        break;
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default climbDataRouter;
