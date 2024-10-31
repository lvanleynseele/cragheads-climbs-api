import mongoose, { ObjectId, Schema } from 'mongoose';
import {
  HoldTypes,
  KeyMoveTypes,
  OutdoorRockFeatures,
} from '../../constants/enums';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Crux {
  _id?: ObjectId;
  routeId: ObjectId;
  description: string;
  difficultyGrade: number;
  length: number; //for example in meters in feet. base number that can be converted
  type: OutdoorRockFeatures[];
  keyHolds: HoldTypes[];
  keyMoves: KeyMoveTypes[];
  beta?: string;
  protection?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CruxSchema = new Schema<Crux>(
  {
    routeId: {
      type: Schema.Types.ObjectId,
      ref: 'Route',
      index: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficultyGrade: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    type: {
      type: [String],
      enum: Object.values(OutdoorRockFeatures),
      required: true,
    },
    keyHolds: {
      type: [String],
      enum: Object.values(HoldTypes),
      required: true,
    },
    keyMoves: {
      type: [String],
      enum: Object.values(KeyMoveTypes),
      required: true,
    },
    beta: {
      type: String,
      required: true,
    },
    protection: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

CruxSchema.plugin(mongooseAggregatePaginate);

const Cruxes = mongoose.model<Crux>('Crux', CruxSchema);

Cruxes.ensureIndexes();

export default Cruxes;
