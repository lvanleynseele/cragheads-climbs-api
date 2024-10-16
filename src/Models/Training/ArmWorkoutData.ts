import { ObjectId } from 'mongoose';

export interface ArmWorkoutData {
  _id: ObjectId;
  userId: ObjectId;
  workoutId: ObjectId;
  exerciseName: ArmExerciseTypes;
  sets: number;
  reps: number;
  weight: number; // Weight used in the exercise
  restTime: number; // Rest time between sets in seconds
  duration: number; // Total duration of the workout in minutes
  intensity: number; // Subjective measure of workout intensity
  notes?: string; // Any additional notes about the workout
  date: Date; // Date of the workout session
}

export enum ArmExerciseTypes {
  BICEP_CURL = 'BICEP_CURL',
  TRICEP_EXTENSION = 'TRICEP_EXTENSION',
  HAMMER_CURL = 'HAMMER_CURL',
  SKULL_CRUSHER = 'SKULL_CRUSHER',
  DUMBBELL_PRESS = 'DUMBBELL_PRESS',
  PULL_UP = 'PULL_UP',
  CHIN_UP = 'CHIN_UP',
  CONCENTRATION_CURL = 'CONCENTRATION_CURL',
  PREACHER_CURL = 'PREACHER_CURL',
  TRICEP_DIP = 'TRICEP_DIP',
  OVERHEAD_TRICEP_EXTENSION = 'OVERHEAD_TRICEP_EXTENSION',
  CABLE_TRICEP_PUSH_DOWN = 'CABLE_TRICEP_PUSH_DOWN',
  REVERSE_GRIP_BICEP_CURL = 'REVERSE_GRIP_BICEP_CURL',
  INCLINE_DUMBBELL_CURL = 'INCLINE_DUMBBELL_CURL',
  CLOSE_GRIP_BENCH_PRESS = 'CLOSE_GRIP_BENCH_PRESS',
  ZOTTMAN_CURL = 'ZOTTMAN_CURL',
}
