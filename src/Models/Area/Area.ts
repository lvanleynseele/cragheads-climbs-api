import {
  ClimbingAreaFacilities,
  ClimbingAreaTags,
  Regions,
} from '../../constants/enums';
import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Area {
  _id: ObjectId;
  name: string;
  //details
  description: string;
  accessDescription?: string;
  size?: number; //size of the area in square meters
  //content
  reviewIds?: ObjectId[];
  images?: string[];
  routeIds?: ObjectId[];
  //location
  address?: string;
  city?: string;
  state?: string;
  country: string;
  zipCode?: string;
  region?: Regions;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  parkingLocation?: {
    type: 'Point';
    coordinates: [number, number];
  };
  //area details
  tags?: ClimbingAreaTags[];
  facilities?: ClimbingAreaFacilities[];
  isGym: boolean;
  //meta
  active: boolean;
  verified: boolean;
  interactionIds?: ObjectId[];
  creatorId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const AreaSchema = new Schema<Area>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: 1,
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
    size: {
      type: Number,
      required: false,
    },
    reviewIds: {
      type: [Schema.Types.ObjectId],
      ref: 'AreaReview',
      required: false,
      default: [],
    },
    images: {
      type: [String],
      required: false,
      default: [],
    },
    routeIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Route',
      required: false,
    },
    address: {
      type: String,
      required: false,
      index: true,
    },
    city: {
      type: String,
      required: false,
      index: 1,
    },
    state: {
      type: String,
      required: false,
      index: 1,
    },
    country: {
      type: String,
      required: false,
      index: 1,
    },
    zipCode: {
      type: String,
      required: false,
    },
    region: {
      type: String,
      enum: Object.values(Regions),
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
        required: true,
      },
    },
    parkingLocation: {
      type: {
        type: String,
        enum: ['Point'],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
    tags: {
      type: [String],
      enum: Object.values(ClimbingAreaTags),
      required: false,
      index: 1,
    },
    facilities: {
      type: [String],
      enum: Object.values(ClimbingAreaFacilities),
      required: false,
      index: 1,
    },
    isGym: {
      type: Boolean,
      required: true,
      index: 1,
    },
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
    verified: {
      type: Boolean,
      required: false,
      default: false,
    },
    interactionIds: {
      type: [Schema.Types.ObjectId],
      ref: 'AreaInteraction',
      required: false,
      default: [],
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

// Create a 2dsphere index on the location field
AreaSchema.index({ location: '2dsphere' });

AreaSchema.index({
  name: 'text',
  description: 'text',
  accessDescription: 'text',
  tags: 'text',
  facilities: 'text',
});

AreaSchema.plugin(mongooseAggregatePaginate);

const Areas = mongoose.model<Area>('Area', AreaSchema);

Areas.ensureIndexes();

export default Areas;
