import express from 'express';
import climbsService from '../../services/v1/Climb/climbs.service';
import { Climb } from '../../Models/Climbs/Climb';

const climbsRouter = express.Router();
climbsRouter.use(express.json());

climbsRouter.get('/by-profile/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const climbs = await climbsService.findByProfileId(profileId);

    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsRouter.get('/by-id/:climbId', async (req, res) => {
  try {
    const climbId = req.params.climbId;
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

climbsRouter.post('/:profileId', async (req, res) => {
  try {
    const climb: Climb = { ...req.body };
    const result = await climbsService.addClimb(req.params.profileId, climb);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsRouter.put('/:climbId', async (req, res) => {
  try {
    const climb = req.body;
    const result = await climbsService.updateClimb(req.params.climbId, climb);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

climbsRouter.delete('/:climbId/:profileId', async (req, res) => {
  try {
    const result = await climbsService.deleteClimb(
      req.params.climbId,
      req.params.profileId,
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default climbsRouter;
