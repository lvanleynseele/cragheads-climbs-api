import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { AreaInteractionTypes } from '../../constants/enums';

export interface AreaInteraction {
  _id: ObjectId;
  interactionType: AreaInteractionTypes;
  userId: ObjectId;
  areaId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AreaInteractionSchema = new Schema<AreaInteraction>(
  {
    interactionType: {
      type: String,
      required: true,
      enum: Object.values(AreaInteractionTypes),
      index: 1,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: 'Area',
      required: true,
      index: 1,
    },
  },
  { timestamps: true },
);

AreaInteractionSchema.plugin(mongooseAggregatePaginate);

const AreaInteractions = mongoose.model<AreaInteraction>(
  'AreaInteraction',
  AreaInteractionSchema,
);

AreaInteractions.ensureIndexes();

export default AreaInteractions;
