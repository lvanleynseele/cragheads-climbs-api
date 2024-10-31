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
  _id?: ObjectId;
  userId: ObjectId;
  username: string;
  areaId: ObjectId;
  // can add climb to a project
  projectId?: ObjectId;
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
  //meta
  createdAt?: Date;
  updatedAt?: Date;
}

export const ClimbSchema = new Schema<Climb>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      // ref: 'Profile',
      index: true,
      required: true,
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: 'Area',
      index: true,
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
      index: true,
    },
    isGymClimb: {
      type: Boolean,
      required: true,
      index: true,
    },
    gymDataIds: {
      type: [Schema.Types.ObjectId],
      ref: 'GymClimbDatas',
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
      index: true,
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

// Climbs.createCollection();

// Climbs.recompileSchema();

Climbs.ensureIndexes();

export default Climbs;
