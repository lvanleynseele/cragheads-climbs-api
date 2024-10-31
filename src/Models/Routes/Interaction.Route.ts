import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { RouteInteractionTypes } from '../../constants/enums';

export interface RouteInteraction {
  _id?: ObjectId;
  interactionType: RouteInteractionTypes;
  userId?: ObjectId;
  routeId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const RouteInteractionSchema = new Schema<RouteInteraction>(
  {
    interactionType: {
      type: String,
      required: true,
      enum: Object.values(RouteInteractionTypes),
      index: 1,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
      index: 1,
    },
    routeId: {
      type: Schema.Types.ObjectId,
      ref: 'Route',
      required: true,
    },
  },
  { timestamps: true },
);

RouteInteractionSchema.plugin(mongooseAggregatePaginate);

const RouteInteractions = mongoose.model<RouteInteraction>(
  'RouteInteraction',
  RouteInteractionSchema,
);

RouteInteractions.ensureIndexes();

export default RouteInteractions;
