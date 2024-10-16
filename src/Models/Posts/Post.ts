import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Post {
  _id: ObjectId;
  userId: ObjectId;
  username: string;
  areaId: ObjectId;
  routeIds?: ObjectId[];
  friendIds?: ObjectId[];
  likes: number;
  likeIds: ObjectId[];
  commentIds: ObjectId[];
  // title?: string;
  caption: string;
  rating?: number;
  images?: string[];
  date: Date;
}

const PostSchema = new Schema<Post>(
  {
    _id: Schema.Types.ObjectId,
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
    areaId: {
      type: Schema.Types.ObjectId,
      ref: 'Area',
      index: true,
      required: true,
    },
    routeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Route',
        required: false,
      },
    ],
    friendIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: false,
      },
    ],
    likes: {
      type: Number,
      required: false,
      default: 0,
    },
    likeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: false,
        default: [],
      },
    ],
    commentIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: false,
        default: [],
      },
    ],
    caption: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    date: { type: Date, default: Date.now, index: true, required: false },
  },
  {
    timestamps: true,
  },
);

PostSchema.plugin(mongooseAggregatePaginate);

const Posts = mongoose.model<Post>('Post', PostSchema);

export default Posts;
