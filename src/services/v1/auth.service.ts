import jwt from 'jsonwebtoken';
import profileService from './Profile/profile.service';
import { Roles } from '../../constants/roles';
import { KeycloakProfile } from 'keycloak-js';
import keycloackService from '../utility/keycloack.service';
import { Profile } from '../../Models/Profile/Profile';

const processAccessToken = async (loginData: any) => {
  const decodedAccessToken = jwt.decode(
    loginData.access_token,
  ) as jwt.JwtPayload;

  if (!decodedAccessToken.sub) throw new Error();

  let profile = await profileService.findProfileById(
    decodedAccessToken.profileId,
  );
  let accessLevels;

  const token = jwt.sign(
    {
      sub: decodedAccessToken.sub,
      sid: decodedAccessToken.sid,
      role: decodedAccessToken.role ?? Roles.USER,
      iat: (decodedAccessToken.iat ?? 0) * 1000,
      exp: (decodedAccessToken.exp ?? 0) * 1000,
    },
    process.env.AUTH_JWT_SECRET ?? 'cragheads-jwt-secret',
  );

  return {
    token,
    refresh_token: loginData.refresh_token,
    refresh_expires_in: loginData.refresh_expires_in,
    profile,
    accessLevels,
  };
};

const createKeycloackUser = async (profile: Profile, password: string) => {
  const newProfile = await profileService.add(profile);

  const keycloakProfile = {
    username: profile.username,
    email: profile.email,
    emailVerified: true,
    enabled: true,
    firstName: profile.firstName,
    lastName: profile.lastName,
    attributes: {
      dateOfBirth: profile.dateOfBirth,
      role: profile.role || Roles.USER,
      profileId: newProfile.insertedId.toString(),
    },
    credentials: [{ type: 'password', value: password, temporary: false }],
  };

  // const keycloakUserId = await keycloackService.post('/users', keycloakProfile);
  const keycloakUserId = await keycloackService.createUser(keycloakProfile);

  return keycloakUserId;
};

const authService = {
  processAccessToken,
  createKeycloackUser,
};

export default authService;
