import express from 'express';
import climbsService from '../../services/v1/Climb/climbs.service';
import Climbs, { Climb } from '../../Models/Climbs/Climb';
import GymClimbDatas, { GymClimbData } from '../../Models/Climbs/GymData';
import { ObjectId } from 'mongoose';

const climbsRouter = express.Router();
climbsRouter.use(express.json());

climbsRouter.get('/by-profile/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    if (!profileId) {
      res.status(400).send('profileId is required');
    }

    const climbs = await climbsService.findByProfileId(profileId);

    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsRouter.get('/by-id/:climbId', async (req, res) => {
  try {
    const climbId = req.params.climbId;
    if (!climbId) {
      res.status(400).send('climbId is required');
    }

    const climb = await climbsService.findById(climbId);
    res.status(200).send(climb);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsRouter.get('/', async (req, res) => {
  try {
    const climbs = await climbsService.findAllClimbs();
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// climbsRouter.get('/gym-climbs/:profileId', async (req, res) => {
//   try {
//     const profileId = req.params.profileId;
//     if (!profileId) {
//       res.status(400).send('profileId is required');
//     }

//     const climbs = await climbsService.findGymClimbs(profileId);

//     res.status(200).send(climbs);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// climbsRouter.get('/outdoor-climbs/:profileId', async (req, res) => {
//   try {
//     const profileId = req.params.profileId;
//     if (!profileId) {
//       res.status(400).send('profileId is required');
//     }

//     const climbs = await climbsService.findOutdoorClimbs(profileId);

//     res.status(200).send(climbs);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

climbsRouter.post('/:profileId', async (req, res) => {
  try {
    const climb = req.body.climb;
    const gymData = req.body.gymData;
    const outdoorData = req.body.outdoorData;
    if (!climb) {
      res.status(400).send('Climb data is required');
    }

    const result = await climbsService.addClimb(
      req.params.profileId,
      climb,
      gymData,
      outdoorData,
    );

    if (!gymData && !outdoorData) {
      res.status(204).send(result);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsRouter.put('/:climbId', async (req, res) => {
  try {
    const climb = req.body;
    const gymData = req.body.gymData;
    const outdoorData = req.body.outdoorData;
    if (!climb) {
      res.status(400).send('Climb data is required');
    }

    const result = await climbsService.updateClimb(
      req.params.climbId,
      climb,
      gymData,
      outdoorData,
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsRouter.delete('/:climbId/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const climbId = req.params.climbId;
    if (!profileId || !climbId) {
      res.status(400).send('Profile and Climb Ids are required');
    }

    const result = await climbsService.deleteClimb(climbId, profileId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default climbsRouter;
