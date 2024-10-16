import mongoose, { ObjectId, Schema } from 'mongoose';
import {
  HangBoardGripTypes,
  HangBoardHoldSizes,
  HangBoardHoldTypes,
  HangBoardTypes,
} from '../../constants/enums';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface HangBoardData {
  _id: ObjectId;
  userId: ObjectId;
  trainingId: ObjectId;
  hangBoardId: ObjectId;
  hangBoardType: HangBoardTypes;
  hangBoardGripType: HangBoardGripTypes;
  hangBoardHoldType: HangBoardHoldTypes;
  hangBoardHoldSize: HangBoardHoldSizes;
  bodyWeight?: number;
  addedWeight?: number;
  duration: number;
  sets: number;
  restTime?: number;
  injuryStatus?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HangBoardDataSchema = new Schema<HangBoardData>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    trainingId: {
      type: Schema.Types.ObjectId,
      ref: 'Training',
      required: true,
    },
    hangBoardId: {
      type: Schema.Types.ObjectId,
      ref: 'HangBoard',
      required: true,
    },
    hangBoardType: {
      type: String,
      enum: Object.values(HangBoardTypes),
      required: true,
    },
    hangBoardGripType: {
      type: String,
      enum: Object.values(HangBoardGripTypes),
      required: true,
    },
    hangBoardHoldType: {
      type: String,
      enum: Object.values(HangBoardHoldTypes),
      required: true,
    },
    hangBoardHoldSize: {
      type: String,
      enum: Object.values(HangBoardHoldSizes),
      required: true,
    },
    bodyWeight: {
      type: Number,
      required: false,
    },
    addedWeight: {
      type: Number,
      required: false,
    },
    duration: {
      type: Number,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    restTime: {
      type: Number,
      required: false,
    },
    injuryStatus: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

HangBoardDataSchema.plugin(mongooseAggregatePaginate);

const HangBoardDatas = mongoose.model<HangBoardData>(
  'HangBoardData',
  HangBoardDataSchema,
);

export default HangBoardDatas;
