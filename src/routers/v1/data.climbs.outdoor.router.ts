import express from 'express';
import climbsDataTimeService from '../../services/v1/ClimbData/data.climbs.time.service';
import climbsDataTypesService from '../../services/v1/ClimbData/data.climbs.type.service';
import climbsDataDifficultyService from '../../services/v1/ClimbData/data.climbs.difficulty.service';
import GymClimbDatas from '../../Models/Climbs/GymData';

const climbsDataRouter = express.Router();
climbsDataRouter.use(express.json());

climbsDataRouter.get('/by-time/month/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataTimeService.getClimbsPerMonth(profileId);
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsDataRouter.get('/by-time/6-month/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataTimeService.getClimbsPer6Months(profileId);
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsDataRouter.get('/by-time/year/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataTimeService.getClimbsPerYear(profileId);
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsDataRouter.get('/by-time/all-time/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataTimeService.allTimeClimbs(profileId);
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsDataRouter.get('/by-type/month/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataTypesService.getClimbsPerTypeMonth(
      profileId,
    );
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsDataRouter.get('/by-type/6-month/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataTypesService.getClimbsPerType6Month(
      profileId,
    );
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsDataRouter.get('/by-type/year/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataTypesService.getClimbsPerTypeYear(profileId);
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsDataRouter.get('/by-type/all-time/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataTypesService.getClimbsPerTypeAllTime(
      profileId,
    );
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsDataRouter.get('/by-difficulty/month/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataDifficultyService.getClimbsDifficultyMonth(
      profileId,
    );
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsDataRouter.get('/by-difficulty/6-month/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataDifficultyService.getClimbsDifficulty6Month(
      profileId,
    );
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsDataRouter.get('/by-difficulty/year/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataDifficultyService.getClimbsDifficultyYear(
      profileId,
    );
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsDataRouter.get('/by-difficulty/all-time/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const climbs = await climbsDataDifficultyService.getClimbsDifficultyAllTime(
      profileId,
    );
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default climbsDataRouter;
