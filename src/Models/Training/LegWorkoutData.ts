import { ObjectId } from 'mongoose';

export interface LegWorkoutData {
  _id: ObjectId;
  userId: ObjectId;
  workoutId: ObjectId;
  exerciseName: LegExerciseTypes;
  sets: number;
  reps: number;
  weight: number; // Weight used in the exercise
  restTime: number; // Rest time between sets in seconds
  duration: number; // Total duration of the workout in minutes
  intensity: number; // Subjective measure of workout intensity
  notes?: string; // Any additional notes about the workout
  date: Date; // Date of the workout session
}

export enum LegExerciseTypes {
  SQUAT = 'SQUAT',
  LUNGE = 'LUNGE',
  LEG_PRESS = 'LEG_PRESS',
  DEADLIFT = 'DEADLIFT',
  LEG_CURL = 'LEG_CURL',
  LEG_EXTENSION = 'LEG_EXTENSION',
  CALF_RAISE = 'CALF_RAISE',
  BULGARIAN_SPLIT_SQUAT = 'BULGARIAN_SPLIT_SQUAT',
  STEP_UP = 'STEP_UP',
  GLUTE_BRIDGE = 'GLUTE_BRIDGE',
  HIP_THRUST = 'HIP_THRUST',
}
