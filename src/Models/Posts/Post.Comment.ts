import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Comment {
  _id: ObjectId;
  postId: ObjectId;
  userId: ObjectId;
  username: string;
  comment: string;
  date: Date;
}

const CommentSchema = new Schema<Comment>(
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
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

CommentSchema.plugin(mongooseAggregatePaginate);

const Comments = mongoose.model<Comment>('Comment', CommentSchema);

export default Comments;
