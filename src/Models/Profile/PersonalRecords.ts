import { ObjectId } from 'mongoose';
import { ClimbingTypes } from '../../constants/enums';

export interface PersonalRecords {
  _id: ObjectId;
  userId: ObjectId;
  type: ClimbingTypes;
  VMax: number;
  VMaxRouteId: ObjectId;
  VMaxDate: Date;
  VMaxClimbId: ObjectId;
  //boulder recent record, last 8 weeks
  VMaxRecent: number;
  VMaxRecentRouteId: ObjectId;
  VMaxRecentDate: Date;
  VMaxRecentClimbId: ObjectId;
}
