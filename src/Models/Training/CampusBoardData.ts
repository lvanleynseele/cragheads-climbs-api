import { ObjectId } from 'mongoose';

export interface CampusBoardData {
  _id: ObjectId;
  userId: ObjectId;
  trainingId: ObjectId;
  campusBoardId: ObjectId;
  campusBoardType: CampusBoardTypes;
  difficultyLevel: number;
  campusBoardReps: number;
  campusBoardSets: number;
  campusBoardRestTime: number;
  gripType: CampusBoardGripTypes;
  bodyWeight?: number;
  addedWeight?: number;
  duration: number;
  sets: number;
  restTime?: number;
  injuryStatus?: string;
  notes?: string;
  date: Date;
}

export enum CampusBoardTypes {
  MAX_REACH = 'MAX_REACH',
  POWER = 'POWER',
}

export enum CampusBoardGripTypes {
  OPEN_HAND = 'OPEN_HAND',
  HALF_CRIMP = 'HALF_CRIMP',
  FULL_CRIMP = 'FULL_CRIMP',
}
