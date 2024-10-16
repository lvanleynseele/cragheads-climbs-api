import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { CardioExerciseTypes } from '../../constants/enums';

export interface CardioWorkoutData {
  _id: ObjectId;
  userId: ObjectId;
  workoutId: ObjectId;
  exerciseName: CardioExerciseTypes;
  duration: number; // Duration of the workout in minutes
  distance?: number; // Distance covered during the workout (if applicable)
  caloriesBurned?: number; // Estimated calories burned
  averageHeartRate?: number; // Average heart rate during the workout
  maxHeartRate?: number; // Maximum heart rate during the workout
  intensity: number; // Subjective measure of workout intensity
  notes?: string; // Any additional notes about the workout
  createdAt: Date; // Date of the workout session
  updatedAt: Date;
}

const CardioWorkoutDataSchema = new Schema<CardioWorkoutData>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    workoutId: {
      type: Schema.Types.ObjectId,
      ref: 'Workout',
      required: true,
    },
    exerciseName: {
      type: String,
      enum: Object.values(CardioExerciseTypes),
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      required: false,
    },
    caloriesBurned: {
      type: Number,
      required: false,
    },
    averageHeartRate: {
      type: Number,
      required: false,
    },
    maxHeartRate: {
      type: Number,
      required: false,
    },
    intensity: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

CardioWorkoutDataSchema.plugin(mongooseAggregatePaginate);

const CardioWorkoutDatas = mongoose.model<CardioWorkoutData>(
  'CardioWorkoutData',
  CardioWorkoutDataSchema,
);

export default CardioWorkoutDatas;
