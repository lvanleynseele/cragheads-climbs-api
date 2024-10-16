import express from 'express';
import trainingService from '../../services/v1/Train/train.service';

const trainingRouter = express.Router();
trainingRouter.use(express.json());

trainingRouter.get('/by-profile/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    if (!profileId) {
      res.status(400).send('profileId is required');
    }

    const trains = await trainingService.findByProfileId(profileId);

    res.status(200).send(trains);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.get('/by-id/:trainId', async (req, res) => {
  try {
    const trainId = req.params.trainId;
    if (!trainId) {
      res.status(400).send('climbId is required');
    }

    const train = await trainingService.findById(trainId);
    res.status(200).send(train);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.get('/', async (req, res) => {
  try {
    const climbs = await trainingService.findAllTrains();
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.post('/:profileId', async (req, res) => {
  try {
    const train = req.body.train;
    const armData = req.body.armData;
    const legData = req.body.legData;
    const hangboardData = req.body.hangboardData;
    const campusboardData = req.body.campusboardData;
    const cardioData = req.body.cardioData;

    if (!train) {
      res.status(400).send('Training data is required');
    }

    const result = await trainingService.addTraining(
      req.params.profileId,
      train,
      armData,
      campusboardData,
      cardioData,
      hangboardData,
      legData,
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.put('/:trainId', async (req, res) => {
  try {
    const train = req.body.train;
    const armData = req.body.armData;
    const legData = req.body.legData;
    const hangboardData = req.body.hangboardData;
    const campusboardData = req.body.campusboardData;
    const cardioData = req.body.cardioData;
    if (!train) {
      res.status(400).send('Climb data is required');
    }

    const result = await trainingService.updateTrain(
      req.params.trainId,
      train,
      armData,
      campusboardData,
      cardioData,
      hangboardData,
      legData,
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.delete('/:trainId/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const trainId = req.params.trainId;
    if (!profileId || !trainId) {
      res.status(400).send('Profile and Climb Ids are required');
    }

    const result = await trainingService.deleteTrain(trainId, profileId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default trainingRouter;
