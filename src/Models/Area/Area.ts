import { ObjectId } from 'mongodb';
import {
  ClimbingAreaFacilities,
  ClimbingAreaTags,
} from '../../constants/enums';
import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

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
  location?: [number, number];
  tags?: ClimbingAreaTags[];
  facilities?: ClimbingAreaFacilities[];
  isGym: boolean;
}

export const AreaSchema = new Schema<ClimbingArea>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  accessDescription: {
    type: String,
    required: false,
    trim: true,
  },
  reviewIds: [{ type: Schema.Types.ObjectId, ref: 'AreaReview' }],
  images: [
    {
      type: String,
      required: false,
    },
  ],
  routeIds: [{ type: Schema.Types.ObjectId, ref: 'Route' }],
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
    index: true,
  },
  state: {
    type: String,
    required: false,
    index: true,
  },
  country: {
    type: String,
    required: true,
    index: true,
  },
  zipCode: {
    type: String,
    required: false,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
      required: true,
    },
    // index: true,
  },
  tags: [
    {
      type: String,
      enum: Object.values(ClimbingAreaTags),
      required: false,
      index: true,
    },
  ],
  facilities: [
    {
      type: String,
      enum: Object.values(ClimbingAreaFacilities),
      required: false,
      index: true,
    },
  ],
  isGym: {
    type: Boolean,
    required: true,
  },
});

AreaSchema.plugin(mongooseAggregatePaginate);

const Areas = mongoose.model<ClimbingArea>('Area', AreaSchema);

export default Areas;
