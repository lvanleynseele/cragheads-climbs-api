import { ObjectId, Schema } from 'mongoose';
import Profiles, { Profile } from '../../../Models/Profile/Profile';

const findProfileById = async (
  profileId: string | ObjectId,
): Promise<Profile | null> => {
  try {
    const profile = (await Profiles.findById(profileId)) as unknown as Profile;

    return profile;
  } catch (error) {
    throw error;
  }
};

const addClimb = async (
  profileId: string | Schema.Types.ObjectId,
  climbId: string | ObjectId,
) => {
  try {
    const response = await Profiles.updateOne(
      { _id: profileId },
      { $addToSet: { climbIds: climbId } },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const removeClimb = async (
  profileId: string | ObjectId,
  climbId: string | ObjectId,
) => {
  try {
    const response = await Profiles.updateOne(
      { _id: profileId },
      { $pull: { climbIds: climbId } as any },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const addTraining = async (
  profileId: string | ObjectId,
  trainingId: string | ObjectId,
) => {
  try {
    const response = await Profiles.updateOne(
      { _id: profileId },
      { $addToSet: { trainingIds: trainingId } },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const removeTraining = async (
  profileId: string | ObjectId,
  trainingId: string | ObjectId,
) => {
  try {
    const response = await Profiles.updateOne(
      { _id: profileId },
      { $pull: { trainingIds: trainingId } as any },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const profileService = {
  findProfileById,
  addClimb,
  removeClimb,
  addTraining,
  removeTraining,
};

export default profileService;
