import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Like {
  _id: ObjectId;
  postId: ObjectId;
  userId: ObjectId;
  username: string;
  date: Date;
}

const PostLikeSchema = new Schema<Like>(
  {
    _id: Schema.Types.ObjectId,
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      index: true,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true,
    },
    username: {
      type: String,
      index: true,
      required: true,
    },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

PostLikeSchema.plugin(mongooseAggregatePaginate);

const Likes = mongoose.model<Like>('Like', PostLikeSchema);

export default Likes;
