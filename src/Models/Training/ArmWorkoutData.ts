import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { ArmExerciseTypes } from '../../constants/enums';

export interface ArmWorkoutData {
  _id: ObjectId;
  userId: ObjectId;
  exerciseName: ArmExerciseTypes;
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

const ArmWorkoutDataSchema = new Schema<ArmWorkoutData>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    exerciseName: {
      type: String,
      enum: Object.values(ArmExerciseTypes),
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

ArmWorkoutDataSchema.plugin(mongooseAggregatePaginate);

const ArmWorkoutDatas = mongoose.model<ArmWorkoutData>(
  'ArmWorkoutData',
  ArmWorkoutDataSchema,
);

export default ArmWorkoutDatas;
