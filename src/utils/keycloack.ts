const Keycloak = require('keycloak-connect');

const config = {
  realm: process.env.KEYCLOACK_REALM,
  'auth-server-url': `${process.env.KEYCLOAK_URL}`,
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_CLIENT,
  'bearer-only': true,
};

const keycloack = new Keycloak({ store: true }, config);

export default keycloack;
