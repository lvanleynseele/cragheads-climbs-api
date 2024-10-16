import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { ArmWorkoutData } from './ArmWorkoutData';
import { CampusBoardData } from './CampusBoardData';
import { CardioWorkoutData } from './CardioData';
import { HangBoardData } from './HangboardData';
import { LegWorkoutData } from './LegWorkoutData';

export interface TrainingDataResponse {
  train: TrainingData;
  armData?: ArmWorkoutData[] | null;
  campusboardData?: CampusBoardData[] | null;
  cardioData?: CardioWorkoutData[] | null;
  hangboardData?: HangBoardData[] | null;
  legData?: LegWorkoutData[] | null;
}

export interface TrainingData {
  _id: ObjectId;
  userId: ObjectId;
  gymId?: ObjectId; //areaId for gym

  armDataIds?: ObjectId[];
  campusboardDataIds?: ObjectId[];
  cardioDataIds?: ObjectId[];
  hangboardDataIds?: ObjectId[];
  legDataIds?: ObjectId[];

  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const TrainingDataSchema = new Schema<TrainingData>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      index: true,
      required: true,
    },
    gymId: {
      type: Schema.Types.ObjectId,
      ref: 'Area',
      index: true,
      required: false,
    },
    armDataIds: {
      type: [Schema.Types.ObjectId],
      ref: 'ArmWorkoutData',
      required: false,
      default: [],
    },
    campusboardDataIds: {
      type: [Schema.Types.ObjectId],
      ref: 'CampusboardWorkoutData',
      required: false,
      default: [],
    },
    cardioDataIds: {
      type: [Schema.Types.ObjectId],
      ref: 'CardioWorkoutData',
      required: false,
      default: [],
    },
    hangboardDataIds: {
      type: [Schema.Types.ObjectId],
      ref: 'HangboardWorkoutData',
      required: false,
      default: [],
    },
    legDataIds: {
      type: [Schema.Types.ObjectId],
      ref: 'LegWorkoutData',
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
  { timestamps: true },
);

TrainingDataSchema.plugin(mongooseAggregatePaginate);

const TrainingDatas = mongoose.model<TrainingData>(
  'TrainingData',
  TrainingDataSchema,
);

export default TrainingDatas;
