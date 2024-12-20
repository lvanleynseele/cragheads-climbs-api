import { Roles } from '../../constants/roles';
import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Profile {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  role: Roles;
  photo?: string;
  friendIds: ObjectId[];
  //bookmarked areas and climbs
  myRouteIds: ObjectId[];
  myAreaIds: ObjectId[];
  climbIds: ObjectId[];
  recordIds: ObjectId[];
  trainingIds: ObjectId[];
  projectIds: ObjectId[];
  date: Date;
}

export const ProfileSchema = new Schema<Profile>(
  {
    // _id: Schema.Types.ObjectId,
    firstName: {
      type: String,
      required: true,
      index: true,
    },
    lastName: {
      type: String,
      required: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      required: false,
      enum: Object.values(Roles),
      default: Roles.USER,
    },
    photo: {
      type: String,
      required: false,
      default: '',
    },
    friendIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      default: [],
      index: true,
    },
    myRouteIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      default: [],
    },
    myAreaIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      default: [],
    },
    climbIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      default: [],
      index: true,
    },
    recordIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      default: [],
      index: true,
    },
    trainingIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      default: [],
      index: true,
    },
    projectIds: {
      type: [Schema.Types.ObjectId],
      required: false,
      default: [],
      index: true,
    },
  },
  { timestamps: true },
);

ProfileSchema.plugin(mongooseAggregatePaginate);

const Profiles = mongoose.model<Profile>('Profile', ProfileSchema);

Profiles.ensureIndexes();

export default Profiles;
