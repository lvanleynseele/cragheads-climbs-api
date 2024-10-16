import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Climb {
  _id: ObjectId;
  userId: ObjectId;
  areaId: ObjectId;
  gymDataId?: ObjectId;
  outdoorDataId?: ObjectId;
  startTime: string;
  endTime: string;
  date: Date;
}

export const ClimbSchema = new Schema<Climb>(
  {
    _id: Schema.Types.ObjectId,
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
    gymDataId: {
      type: Schema.Types.ObjectId,
      ref: 'GymClimbData',
      required: false,
    },
    outdoorDataId: {
      type: Schema.Types.ObjectId,
      ref: 'OutdoorClimbData',
      required: false,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now, index: true, required: true },
  },
  {
    timestamps: true,
  },
);

ClimbSchema.plugin(mongooseAggregatePaginate);

const Climbs = mongoose.model<Climb>('Climb', ClimbSchema);

export default Climbs;
