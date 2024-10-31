import { ObjectId } from 'mongoose';
import logger from '../../../utils/logger';
import RouteInteractions from '../../../Models/Routes/Interaction.Route';

const addInteraction = (
  areaId: string | ObjectId,
  interactionType: string,
  userId?: string | ObjectId,
) => {
  new Promise((resolve, reject) => {
    RouteInteractions.create({
      areaId,
      interactionType,
      userId,
    })
      .then(interaction =>
        resolve(logger.info('interaction', interaction._id + ' created')),
      )
      .catch(err => reject(logger.error(err)));
  });
};

const routeInteractionService = {
  addInteraction,
};

export default routeInteractionService;
