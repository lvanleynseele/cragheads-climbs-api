import { ObjectId } from 'mongoose';

export interface CardioWorkoutData {
  _id: ObjectId;
  userId: ObjectId;
  workoutId: ObjectId;
  exerciseName: string;
  duration: number; // Duration of the workout in minutes
  distance?: number; // Distance covered during the workout (if applicable)
  caloriesBurned?: number; // Estimated calories burned
  averageHeartRate?: number; // Average heart rate during the workout
  maxHeartRate?: number; // Maximum heart rate during the workout
  intensity: number; // Subjective measure of workout intensity
  notes?: string; // Any additional notes about the workout
  date: Date; // Date of the workout session
}

export enum CardioExerciseTypes {
  RUNNING = 'RUNNING',
  CYCLING = 'CYCLING',
  SWIMMING = 'SWIMMING',
  ROWING = 'ROWING',
  ELLIPTICAL = 'ELLIPTICAL',
  JUMP_ROPE = 'JUMP_ROPE',
  HIKING = 'HIKING',
  WALKING = 'WALKING',
  STAIR_CLIMBING = 'STAIR_CLIMBING',
}
