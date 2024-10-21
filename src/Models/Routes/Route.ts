import {
  ClimbingTypes,
  OutdoorRockFeatures,
  OutdoorRockQuality,
  OutdoorRockTypes,
} from '../../constants/enums';
import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Route {
  _id: ObjectId;
  areaId: ObjectId;
  //details
  name: string;
  type: ClimbingTypes;
  difficulty: number;
  angle?: number; // angle of slope on the wall
  height?: number; // height of the wall
  description: string;
  accessDescription: string;
  //content
  images?: string[];
  reviewIds?: ObjectId[]; //this should come from aggregation, not stored here
  betaIds?: ObjectId[]; //this should come from aggregation, not stored here
  //location
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  //rock details
  rockType?: OutdoorRockTypes;
  rockQuality?: OutdoorRockQuality;
  rockFeatures?: OutdoorRockFeatures[];
  //meta
  active: boolean;
  verified: boolean;
  interactionIds?: ObjectId[];
  creatorId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const RouteSchema = new Schema<Route>(
  {
    areaId: {
      type: Schema.Types.ObjectId,
      ref: 'Area',
      required: true,
      index: 1,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: 1,
    },
    type: {
      type: String,
      enum: Object.values(ClimbingTypes),
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    angle: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
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
    images: {
      type: [String],
      required: false,
      default: [],
    },
    reviewIds: {
      type: [Schema.Types.ObjectId],
      ref: 'RouteReview',
      required: false,
      default: [],
    },
    betaIds: {
      type: [Schema.Types.ObjectId],
      ref: 'RouteBeta',
      required: false,
      default: [],
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
    rockType: {
      type: String,
      enum: Object.values(OutdoorRockTypes),
      required: false,
      index: 1,
    },
    rockQuality: {
      type: String,
      enum: Object.values(OutdoorRockQuality),
      required: false,
      index: 1,
    },
    rockFeatures: {
      type: [String],
      enum: Object.values(OutdoorRockFeatures),
      required: false,
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
      ref: 'Interaction',
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

RouteSchema.index({ location: '2dsphere' });

RouteSchema.index({
  name: 'text',
  description: 'text',
  address: 'text',
  city: 'text',
  state: 'text',
  country: 'text',
});

RouteSchema.plugin(mongooseAggregatePaginate);

const Routes = mongoose.model('Route', RouteSchema);

Routes.ensureIndexes();

export default Routes;
