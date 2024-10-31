import logger from '../utils/logger';

const mongoose = require('mongoose');

export const intializeDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.DB_CONN_STRING || 'mongodb://localhost:27017/cragheads-db',
    );
    if (connection) {
      logger.info('Connected to database');
    }
  } catch (error) {
    logger.error('Error connecting to database', error);
  }
};

export const initializeSchemas = async () => {
  try {
    await intializeDB();
    logger.info('Initializing schemas');
  } catch (error) {
    logger.error('Error initializing schemas', error);
  }
};

//https://medium.com/@Bigscal-Technologies/how-to-set-up-node-js-with-mongodb-using-docker-49b5fb849bc7
