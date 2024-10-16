import mongoose, { ObjectId, Schema } from 'mongoose';
import { KeyMoveTypes } from '../../constants/enums';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

//this object will be per route per climb
export interface OutdoorClimbData {
  _id: ObjectId;
  userId: ObjectId;
  climbId: ObjectId;
  //route specific info
  routeId: ObjectId;
  didSend: boolean;
  numberOfAttempts: number;
  percievedDifficulty?: number;
  myStyle: boolean;
  keyMoves?: KeyMoveTypes[];
  //content
  beta?: string; //convert this on submit to a new RouteBeta object, add to routeBeta collection, and store the id here
  images?: string[];
  notes?: string;
  //conditions?: string;
  date: Date;
}

const OutdoorClimbDataSchema = new Schema<OutdoorClimbData>(
  {
    _id: Schema.Types.ObjectId,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true,
    },
    climbId: {
      type: Schema.Types.ObjectId,
      ref: 'Climb',
      index: true,
      required: true,
    },
    routeId: {
      type: Schema.Types.ObjectId,
      ref: 'Route',
      index: true,
      required: true,
    },
    didSend: {
      type: Boolean,
      required: true,
    },
    numberOfAttempts: {
      type: Number,
      required: true,
    },
    percievedDifficulty: {
      type: Number,
      required: false,
    },
    myStyle: {
      type: Boolean,
      required: false,
    },
    keyMoves: {
      type: [String],
      enum: Object.values(KeyMoveTypes),
      required: false,
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
    date: { type: Date, default: Date.now, index: true, required: true },
  },
  {
    timestamps: true,
  },
);

OutdoorClimbDataSchema.plugin(mongooseAggregatePaginate);

const OutdoorClimbDatas = mongoose.model<OutdoorClimbData>(
  'OutdoorClimbData',
  OutdoorClimbDataSchema,
);

export default OutdoorClimbDatas;
