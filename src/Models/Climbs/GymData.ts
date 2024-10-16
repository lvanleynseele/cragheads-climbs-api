import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import {
  ClimbingTypes,
  GymHoldTypes,
  KeyMoveTypes,
} from '../../constants/enums';

export interface GymClimbData {
  _id: ObjectId;
  userId: ObjectId;
  //route specific info
  type: ClimbingTypes;
  difficulty: number;
  didSend: boolean;
  numberOfAttempts: number;
  percievedDifficulty?: number;
  keyHolds?: GymHoldTypes[];
  keyMoves?: KeyMoveTypes[];
  //content
  beta?: string; //not a route beta, maybe should just be notes
  images?: string[];
  notes?: string;
}

const GymClimbDataSchema = new Schema<GymClimbData>(
  {
    // _id: Schema.Types.ObjectId,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ClimbingTypes),
      required: true,
      index: true,
    },
    difficulty: {
      type: Number,
      required: true,
      index: true,
    },
    didSend: {
      type: Boolean,
      required: true,
      index: true,
    },
    numberOfAttempts: {
      type: Number,
      required: false,
      index: true,
    },
    percievedDifficulty: {
      type: Number,
      required: false,
      default: null,
    },
    keyHolds: {
      type: [String],
      enum: Object.values(GymHoldTypes),
      required: false,
      default: [],
    },
    keyMoves: {
      type: [String],
      enum: Object.values(KeyMoveTypes),
      required: false,
      default: [],
    },
    beta: {
      type: String,
      required: false,
      default: '',
    },
    images: {
      type: [String],
      required: false,
      default: [],
    },
    notes: {
      type: String,
      required: false,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

GymClimbDataSchema.plugin(mongooseAggregatePaginate);

const GymClimbDatas = mongoose.model<GymClimbData>(
  'GymClimbDatas',
  GymClimbDataSchema,
);

export default GymClimbDatas;
