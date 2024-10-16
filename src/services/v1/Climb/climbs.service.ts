import { ObjectId } from 'mongoose';
import Climbs, { Climb, ClimbResponse } from '../../../Models/Climbs/Climb';
import profileService from '../Profile/profile.service';
import gymClimbDataService from './climbs.gymData.service';
import outdoorClimbDataService from './climbs.outdoorData.service';
import { GymClimbData } from '../../../Models/Climbs/GymData';
import { OutdoorClimbData } from '../../../Models/Climbs/OutdoorData';

const findById = async (climbId: string | ObjectId) => {
  const climb = await Climbs.findById(climbId);
  if (!climb) {
    throw new Error('Climb not found');
  }

  if (climb.gymDataIds) {
    const gymData = await Promise.all(
      climb.gymDataIds.map(async gymDataId => {
        return await gymClimbDataService.findById(gymDataId);
      }),
    );

    return { climb, gymData };
  }

  if (climb.outdoorDataIds) {
    const outdoorData = await Promise.all(
      climb.outdoorDataIds.map(async outdoorDataId => {
        return await outdoorClimbDataService.findById(outdoorDataId);
      }),
    );
    return { climb, outdoorData };
  }

  return { climb };
};

const findByProfileId = async (profileId: string | ObjectId) =>
  //: Promise<ClimbResponse[]>
  {
    const profile = await profileService.findProfileById(profileId);

    let climbs: Object[] = [];

    if (profile && profile.climbIds) {
      await Promise.all(
        profile.climbIds.map(async climbId => {
          const climb = await findById(climbId);
          climbs.push(climb);
        }),
      );
    }

    return climbs;
  };

const findAllClimbs = async (): Promise<Climb[]> => {
  return await Climbs.find({}); //collections.climbs.find({}).toArray();
};

const addClimb = async (
  profileId: string | ObjectId,
  climb: Climb,
  gymData?: GymClimbData[],
  outdoorData?: OutdoorClimbData[],
): Promise<Climb> => {
  await Climbs.validate(climb);

  if (gymData) {
    const gymResponse = await Promise.all(
      gymData.map(async data => {
        return await gymClimbDataService.add(data);
      }),
    );

    climb.gymDataIds = gymResponse.map(data => data._id);
  }

  if (outdoorData) {
    const outdoorResponse = await Promise.all(
      outdoorData.map(async data => {
        return await outdoorClimbDataService.add(data);
      }),
    );

    climb.outdoorDataIds = outdoorResponse.map(data => data._id);
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
): Promise<Climb | null> => {
  await Climbs.validate(climb);

  if (gymData) {
    await gymClimbDataService.update(gymData);
  }

  if (outdoorData) {
    await outdoorClimbDataService.update(outdoorData);
  }

  return await Climbs.findByIdAndUpdate({ _id: id }, { $set: climb });
};

const deleteClimb = async (
  id: string | ObjectId,
  profileId: string | ObjectId,
): Promise<Climb | null> => {
  const result = await Climbs.findByIdAndDelete({ _id: id });
  if (result && result.gymDataIds) {
    await Promise.all(
      result.gymDataIds.map(async gymDataId => {
        await gymClimbDataService.remove(gymDataId);
      }),
    );
  }
  if (result && result.outdoorDataIds) {
    await Promise.all(
      result.outdoorDataIds.map(async outdoorDataId => {
        await outdoorClimbDataService.remove(outdoorDataId);
      }),
    );
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
