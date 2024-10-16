import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { GymClimbData } from './GymData';
import { OutdoorClimbData } from './OutdoorData';

export interface ClimbResponse {
  climb: Climb;
  gymData?: GymClimbData | null;
  outdoorData?: OutdoorClimbData | null;
}

export interface Climb {
  _id: ObjectId;
  userId: ObjectId;
  areaId: ObjectId;
  isGymClimb: boolean;
  gymDataId?: ObjectId;
  outdoorDataId?: ObjectId;
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
      ref: 'User',
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
    gymDataId: {
      type: Schema.Types.ObjectId,
      ref: 'GymClimbData',
      required: false,
      default: null,
    },
    outdoorDataId: {
      type: Schema.Types.ObjectId,
      ref: 'OutdoorClimbData',
      required: false,
      default: null,
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
