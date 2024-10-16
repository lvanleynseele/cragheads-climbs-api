import { ObjectId } from 'mongodb';
import {
  ClimbingAreaFacilities,
  ClimbingAreaTags,
} from '../../constants/enums';

export interface ClimbingArea {
  _id: ObjectId;
  name: string;
  description: string;
  accessDescription?: string;
  reviewIds: ObjectId[];
  images: string[];
  routeIds?: ObjectId[];
  address?: string;
  city?: string;
  state?: string;
  country: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  tags?: ClimbingAreaTags[];
  facilities?: ClimbingAreaFacilities[];
  isGym: boolean;
}
