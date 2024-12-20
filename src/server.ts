import cors from 'cors';

export default function createServer() {
  const bodyParser = require('body-parser');
  const express = require('express');

  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  return app;
}
