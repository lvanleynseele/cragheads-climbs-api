import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export interface AreaReview {
  _id: ObjectId;
  areaId: string;
  userId: string;
  userName: string;
  rating: number;
  review: string;
  images?: string[];
  date: Date;
}

export const AreaReviewSchema = new Schema<AreaReview>({
  _id: Schema.Types.ObjectId,
  areaId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  userName: Schema.Types.ObjectId,
  rating: Number,
  review: String,
  images: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
});

// AreaReviewSchema.index({ areaId: 1, userId: 1 }, { unique: true });
const AreaReview = mongoose.model<AreaReview>('AreaReview', AreaReviewSchema);

export default AreaReview;
