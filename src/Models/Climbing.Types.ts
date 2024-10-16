import { ObjectId } from 'mongodb';
import { ClimbingTypes } from '../constants/enums';

export interface ClimbingType {
  _id: ObjectId;
  type: ClimbingTypes;
  description: string;
  image: string;
}
