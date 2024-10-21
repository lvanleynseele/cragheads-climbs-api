import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { CampusBoardGripTypes, CampusBoardTypes } from '../../constants/enums';

export interface CampusBoardData {
  _id?: ObjectId;
  userId: ObjectId;
  trainingId: ObjectId;
  campusBoardType: CampusBoardTypes;
  gripType: CampusBoardGripTypes;
  bodyWeight?: number;
  addedWeight?: number;
  duration: number;
  sets: number;
  restTime?: number;
  injuryStatus?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CampusBoardDataSchema = new Schema<CampusBoardData>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    trainingId: {
      type: Schema.Types.ObjectId,
      ref: 'TrainingData',
      required: true,
      index: true,
    },
    campusBoardType: {
      type: String,
      enum: Object.values(CampusBoardTypes),
      required: true,
      index: true,
    },
    gripType: {
      type: String,
      enum: Object.values(CampusBoardGripTypes),
      required: true,
      index: true,
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

CampusBoardDataSchema.plugin(mongooseAggregatePaginate);

export const CampusBoardDatas = mongoose.model<CampusBoardData>(
  'CampusBoardData',
  CampusBoardDataSchema,
);

CampusBoardDatas.ensureIndexes();

export default CampusBoardDatas;
