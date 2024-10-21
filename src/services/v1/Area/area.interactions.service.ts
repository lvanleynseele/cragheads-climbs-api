import { ObjectId } from 'mongoose';

import Areas from '../../../Models/Area/Area';

import logger from '../../../utils/logger';
import AreaInteractions, {
  AreaInteraction,
} from '../../../Models/Area/Interaction.Area';

const addInteraction = (
  areaId: string | ObjectId,
  interactionType: string,
  userId?: string | ObjectId,
) => {
  new Promise((resolve, reject) => {
    AreaInteractions.create({
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

const areaInteractionService = {
  addInteraction,
};

export default areaInteractionService;
