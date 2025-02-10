import express from 'express';
import outdoorClimbDataService from '../../services/v1/Climb/climbs.outdoorData.service';

const outdoorRouter = express.Router();
outdoorRouter.use(express.json());

outdoorRouter.get('/by-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send('id is required');
    }

    const result = await outdoorClimbDataService.findById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

outdoorRouter.put('/', async (req, res) => {
  try {
    const outdoorData = req.body;
    if (!outdoorData) {
      res.status(400).send('Gym data is required');
    }

    const result = await outdoorClimbDataService.update(outdoorData);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

outdoorRouter.delete('/:id', async (req, res) => {
  try {
    const gymId = req.params.id;
    if (!gymId) {
      res.status(400).send('id is required');
    }

    const result = await outdoorClimbDataService.remove(gymId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default outdoorRouter;
