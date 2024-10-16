import logger from '../../utils/logger';

import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import Profiles from '../../Models/Profile/Profile';

export const collections: { [key: string]: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING || 'mongodb://localhost:27017/cragheads-db',
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  if (db) {
    logger.info(`Successfully connected to database: ${db.databaseName}`);
  } else {
    logger.error('Failed to connect to database');
  }
}
