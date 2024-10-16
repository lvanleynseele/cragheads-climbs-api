import { ObjectId } from 'mongoose';
import Climbs, { Climb } from '../../../Models/Climbs/Climb';
import profileService from '../Profile/profile.service';
import gymClimbDataService from './climbs.gymData.service';
import outdoorClimbDataService from './climbs.outdoorData.service';
import { GymClimbData } from '../../../Models/Climbs/GymData';
import { OutdoorClimbData } from '../../../Models/Climbs/OutdoorData';

const findById = async (climbId: string | ObjectId) => {
  const climb = await Climbs.findById({ climbId });
  if (!climb) {
    throw new Error('Climb not found');
  }

  if (climb.gymDataId) {
    const gymData = await gymClimbDataService.findById(climb.gymDataId);
    return { climb, gymData };
  }

  if (climb.outdoorDataId) {
    const outdoorData = await outdoorClimbDataService.findById(
      climb.outdoorDataId,
    );
    return { climb, outdoorData };
  }

  return climb;
};

const findByProfileId = async (profileId: string | ObjectId) => {
  const profile = await profileService.findProfileById(profileId);

  let climbs: Object[] = [];

  if (profile && profile.myClimbIds) {
    await Promise.all(
      profile.myClimbIds.map(async climbId => {
        const climb = await findById(climbId);
        climbs.push(climb);
      }),
    );
  }

  return climbs;
};

const findAllClimbs = async () => {
  return await Climbs.find({}); //collections.climbs.find({}).toArray();
};

const addClimb = async (
  profileId: string | ObjectId,
  climb: Climb,
  gymData?: GymClimbData,
  outdoorData?: OutdoorClimbData,
) => {
  await Climbs.validate(climb);

  if (gymData) {
    await gymClimbDataService.add(gymData);
    climb.gymDataId = gymData._id;
  }

  if (outdoorData) {
    await outdoorClimbDataService.add(outdoorData);
    climb.outdoorDataId = outdoorData._id;
  }

  const result = await Climbs.create(climb);

  await profileService.addClimb(profileId, result._id);

  return result;
};

const updateClimb = async (
  id: string | ObjectId,
  climb: Climb,
  gymData?: GymClimbData,
  outdoorData?: OutdoorClimbData,
) => {
  await Climbs.validate(climb);

  if (gymData) {
    await gymClimbDataService.update(gymData);
    climb.gymDataId = gymData._id;
  }

  if (outdoorData) {
    await outdoorClimbDataService.update(outdoorData);
    climb.outdoorDataId = outdoorData._id;
  }

  return await Climbs.findByIdAndUpdate({ _id: id }, { $set: climb });
};

const deleteClimb = async (
  id: string | ObjectId,
  profileId: string | ObjectId,
) => {
  const result = await Climbs.findByIdAndDelete({ _id: id });
  if (result && result.gymDataId) {
    await gymClimbDataService.remove(result.gymDataId);
  }
  if (result && result.outdoorDataId) {
    await outdoorClimbDataService.remove(result.outdoorDataId);
  }

  await profileService.removeClimb(profileId, id);

  return result;
};

const climbsService = {
  findById,
  findByProfileId,
  addClimb,
  updateClimb,
  deleteClimb,
  findAllClimbs,
};

export default climbsService;
