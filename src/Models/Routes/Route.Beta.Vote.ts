import { ObjectId } from 'mongodb';

export interface RouteBetaVote {
  _id: ObjectId;
  betaId: ObjectId;
  userId: ObjectId;
  vote: number;
}
