import { ObjectId } from 'mongoose';

export interface TrainingData {
  _id: ObjectId;
  userId: ObjectId;
  gymId?: ObjectId; //areaId for gym
  startTime: string;
  endTime: string;
  date: Date;
}
