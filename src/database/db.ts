import { ProfileSchema } from '../Models/Profile/Profile';
import logger from '../utils/logger';

const mongoose = require('mongoose');

export const connect = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.DB_CONN_STRING || 'mongodb://localhost:27017/cragheads-db',
    );
    if (connection) {
      logger.info('Connected to database');

      logger.info('Schemas initialized');
    }
  } catch (error) {
    logger.error('Error connecting to database', error);
  }
};

async function indexSchemas() {
  try {
    const Profile = mongoose.model('Profile', ProfileSchema);
    Profile.createIndexes();
  } catch (error) {
    logger.error('Error indexing schemas', error);
  }
}
//https://medium.com/@Bigscal-Technologies/how-to-set-up-node-js-with-mongodb-using-docker-49b5fb849bc7
