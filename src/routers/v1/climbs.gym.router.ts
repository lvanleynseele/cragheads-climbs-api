import express from 'express';
import gymClimbDataService from '../../services/v1/Climb/climbs.gymData.service';

const gymRouter = express.Router();
gymRouter.use(express.json());

gymRouter.get('/by-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send('id is required');
    }

    const result = await gymClimbDataService.findById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

gymRouter.put('/', async (req, res) => {
  try {
    const gymData = req.body;
    if (!gymData) {
      res.status(400).send('Gym data is required');
    }

    const result = await gymClimbDataService.update(gymData);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

gymRouter.delete('/:id', async (req, res) => {
  try {
    const gymId = req.params.id;
    if (!gymId) {
      res.status(400).send('gymId is required');
    }

    const result = await gymClimbDataService.remove(gymId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default gymRouter;
