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
    addCollectionsToDatabase(db);
    indexCollections(db);

    logger.info(`Successfully connected to database: ${db.databaseName}`);
  } else {
    logger.error('Failed to connect to database');
  }
}

function addCollectionsToDatabase(db: mongoDB.Db) {
  Profiles.syncIndexes(db);

  //profile collections
  // collections.profiles = db.collection('profiles');
  // collections.posts = db.collection('posts');
  // collections.climbs = db.collection('climbs');
  // collections.friendRequests = db.collection('friendRequests');
  // collections.preferences = db.collection('preferences');
  // collections.routes = db.collection('routes');
  // db.listCollections()
  //   .toArray()
  //   .then(collections => {
  //     console.log(collections);
  //   });
}

async function indexCollections(db: mongoDB.Db) {
  try {
    if (!(await db.collection('profiles').indexExists('username_text'))) {
      db.collection('profiles').createIndex({
        username: 'text',
        email: 'text',
        firstname: 'text',
        lastname: 'text',
      });
    }

    if (!(await db.collection('posts').indexExists('title_text'))) {
      db.collection('posts').createIndex({
        username: 'text',
        caption: 'text',
        content: 'text',
        areaId: 'text',
      });
    }

    db.collection('climbs').createIndex({
      startTime: 'text',
    });

    logger.info('Successfully created indicies');
  } catch (error) {
    logger.error(`Error creating indicies: ${error}`);
  }
}
