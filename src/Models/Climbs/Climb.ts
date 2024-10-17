import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { GymClimbData } from './GymData';
import { OutdoorClimbData } from './OutdoorData';

export interface ClimbResponse {
  climb: Climb;
  gymData?: GymClimbData[] | null;
  outdoorData?: OutdoorClimbData[] | null;
}

export interface Climb {
  _id: ObjectId;
  userId: ObjectId;
  username: string;
  areaId: ObjectId;
  //climb data
  isGymClimb: boolean;
  gymDataIds?: ObjectId[];
  outdoorDataIds?: ObjectId[];
  //content
  friendIds?: ObjectId[]; //tag friends on climb
  likes?: number;
  likeIds?: ObjectId[];
  caption?: string;
  images?: string[];
  //time of climb
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ClimbSchema = new Schema<Climb>(
  {
    // _id: Schema.Types.ObjectId,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      index: true,
      required: true,
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: 'Area',
      index: true,
      required: true,
    },
    isGymClimb: {
      type: Boolean,
      required: true,
      index: true,
    },
    gymDataIds: {
      type: [Schema.Types.ObjectId],
      ref: 'GymClimbData',
      required: false,
      default: [],
    },
    outdoorDataIds: {
      type: [Schema.Types.ObjectId],
      ref: 'OutdoorClimbData',
      required: false,
      default: [],
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ClimbSchema.plugin(mongooseAggregatePaginate);

const Climbs = mongoose.model<Climb>('Climb', ClimbSchema);

export default Climbs;
