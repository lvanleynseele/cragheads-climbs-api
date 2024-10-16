import cors from 'cors';

const keycloakConfig = {
  realm: process.env.KEYCLOACK_REALM,
  'auth-server-url': `${process.env.KEYCLOAK_URL}`,
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_CLIENT,
  'bearer-only': true,
};

export default function createServer() {
  const bodyParser = require('body-parser');
  const express = require('express');
  const session = require('express-session');

  const memoryStore = new session.MemoryStore();

  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    session({
      secret: 'mySecret',
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    }),
  );

  return app;
}
