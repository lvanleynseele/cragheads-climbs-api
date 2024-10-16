import { ObjectId } from 'mongoose';

export interface HangBoardData {
  _id: ObjectId;
  userId: ObjectId;
  trainingId: ObjectId;
  hangBoardId: ObjectId;
  hangBoardType: HangBoardTypes;
  hangBoardGripType: HangBoardGripTypes;
  hangBoardHoldType: HangBoardHoldTypes;
  hangBoardHoldSize: HangBoardHoldSizes;
  bodyWeight?: number;
  addedWeight?: number;
  duration: number;
  sets: number;
  restTime?: number;
  injuryStatus?: string;
  notes?: string;
  date: Date;
}

export enum HangBoardTypes {
  MAX_WEIGHT = 'MAX_WEIGHT',
  ENDURANCE = 'ENDURANCE',
}

export enum HangBoardGripTypes {
  '4FINGER' = '4FINGER',
  '3FINGER' = '3FINGER',
  '2FINGER' = '2FINGER',
  MONO = 'MONO',
  'FULL_CRIMP' = 'FULL_CRIMP',
  'HALF_CRIMP' = 'HALF_CRIMP',
  'OPEN_HAND' = 'OPEN_HAND',
  POCKET = 'POCKET',
}

export enum HangBoardHoldTypes {
  JUG = 'JUG',
  CRIMP = 'CRIMP',
  PINCH = 'PINCH',
  SLOPER = 'SLOPER',
}

export enum HangBoardHoldSizes {
  '6mm' = '6mm',
  '8mm' = '8mm',
  '10mm' = '10mm',
  '12mm' = '12mm',
  '14mm' = '14mm',
  '18mm' = '18mm',
  '20mm' = '20mm',
  '40mm' = '40mm',
}
