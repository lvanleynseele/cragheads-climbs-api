import express from 'express';
import trainingService from '../../services/v1/Train/train.service';
import armDataService from '../../services/v1/Train/train.armWorkout.service';
import legDataService from '../../services/v1/Train/train.legWorkout.service';
import cardioDataService from '../../services/v1/Train/train.cardioWorkout.service';
import campusboardDataService from '../../services/v1/Train/train.campusboardWorkout.service';
import hangboardDataService from '../../services/v1/Train/train.hangboardWorkout.service';

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
    if (!train) {
      res.status(400).send('Climb data is required');
    }

    const result = await trainingService.updateTrain(req.params.trainId, train);

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

trainingRouter.put('/arms', async (req, res) => {
  try {
    const armData = req.body;
    if (!armData) {
      res.status(400).send('Arm data is required');
    }

    const result = await armDataService.update(armData);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.delete('/arms/:armsId', async (req, res) => {
  try {
    const armsId = req.params.armsId;
    if (!armsId) {
      res.status(400).send('Train Id is required');
    }

    const result = await armDataService.remove(armsId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.put('/legs', async (req, res) => {
  try {
    const legData = req.body;
    if (!legData) {
      res.status(400).send('Leg data is required');
    }

    const result = await legDataService.update(legData);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.delete('/legs/:legsId', async (req, res) => {
  try {
    const legsId = req.params.legsId;
    if (!legsId) {
      res.status(400).send('Train Id is required');
    }

    const result = await legDataService.remove(legsId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.put('/cardio', async (req, res) => {
  try {
    const cardioData = req.body;
    if (!cardioData) {
      res.status(400).send('Cardio data is required');
    }

    const result = await cardioDataService.update(cardioData);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.delete('/cardio/:cardioId', async (req, res) => {
  try {
    const cardioId = req.params.cardioId;
    if (!cardioId) {
      res.status(400).send('Train Id is required');
    }

    const result = await cardioDataService.remove(cardioId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.put('/campusboard', async (req, res) => {
  try {
    const campusboardData = req.body;
    if (!campusboardData) {
      res.status(400).send('Campusboard data is required');
    }

    const result = await campusboardDataService.update(campusboardData);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.delete('/campusboard/:campusboardId', async (req, res) => {
  try {
    const campusboardId = req.params.campusboardId;
    if (!campusboardId) {
      res.status(400).send('Train Id is required');
    }

    const result = await campusboardDataService.remove(campusboardId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.put('/hangboard', async (req, res) => {
  try {
    const hangboardData = req.body;
    if (!hangboardData) {
      res.status(400).send('Hangboard data is required');
    }

    const result = await hangboardDataService.update(hangboardData);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

trainingRouter.delete('/hangboard/:hangboardId', async (req, res) => {
  try {
    const hangboardId = req.params.hangboardId;
    if (!hangboardId) {
      res.status(400).send('Train Id is required');
    }

    const result = await hangboardDataService.remove(hangboardId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default trainingRouter;
