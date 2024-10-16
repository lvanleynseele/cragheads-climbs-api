import mongoose, { ObjectId, Schema } from 'mongoose';
import { LegExerciseTypes } from '../../constants/enums';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface LegWorkoutData {
  _id: ObjectId;
  userId: ObjectId;
  exerciseName: LegExerciseTypes;
  sets?: number;
  reps?: number;
  weight?: number; // Weight used in the exercise
  restTime?: number; // Rest time between sets in seconds
  duration?: number; // Total duration of the workout in minutes
  intensity?: number; // Subjective measure of workout intensity
  notes?: string; // Any additional notes about the workout
  createdAt: Date; // Date of the workout session
  updatedAt: Date;
}

const LegWorkoutDataSchema = new Schema<LegWorkoutData>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    exerciseName: {
      type: String,
      enum: Object.values(LegExerciseTypes),
      required: true,
    },
    sets: {
      type: Number,
      required: false,
    },
    reps: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    restTime: {
      type: Number,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    intensity: {
      type: Number,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

LegWorkoutDataSchema.plugin(mongooseAggregatePaginate);

const LegWorkoutDatas = mongoose.model<LegWorkoutData>(
  'LegWorkoutData',
  LegWorkoutDataSchema,
);

export default LegWorkoutDatas;
