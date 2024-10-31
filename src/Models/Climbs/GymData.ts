import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { ClimbingTypes, HoldTypes, KeyMoveTypes } from '../../constants/enums';

export interface GymClimbData {
  _id?: ObjectId;
  userId: ObjectId;
  climbId: ObjectId;
  //route specific info
  type: ClimbingTypes;
  difficulty: number;
  holdColor?: string;
  didSend: boolean;
  numberOfAttempts: number;
  percievedDifficulty?: number;
  keyHolds?: HoldTypes[];
  keyMoves?: KeyMoveTypes[];
  //content
  beta?: string; //not a route beta, maybe should just be notes
  notes?: string;
  rating?: number;
  //meta
  createdAt?: Date;
  updatedAt?: Date;
}

const GymClimbDataSchema = new Schema<GymClimbData>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      index: true,
      required: true,
    },
    climbId: {
      type: Schema.Types.ObjectId,
      ref: 'Climb',
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
    holdColor: {
      type: String,
      required: false,
      default: '',
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
      enum: Object.values(HoldTypes),
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
    notes: {
      type: String,
      required: false,
      default: '',
    },
    rating: {
      type: Number,
      required: false,
      default: null,
      min: 0,
      max: 5,
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

// GymClimbDatas.recompileSchema();

GymClimbDatas.ensureIndexes();

export default GymClimbDatas;
