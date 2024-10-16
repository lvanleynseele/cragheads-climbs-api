import { ObjectId } from 'mongodb';
import { collections } from '../../utility/database.service';
import profileService from './profile.service';
import GymClimbDatas, { GymClimb } from '../../../Models/Climbs/GymData';

const findByClimbId = async (climbId: string | ObjectId) => {
  return (await GymClimbDatas.findById({
    _id: new ObjectId(climbId),
  })) as unknown as GymClimb;
};

const findByProfileId = async (profileId: string | ObjectId) => {
  const profile = await profileService.findProfileById(profileId);

  const climbs: GymClimb[] = [];

  if (profile && profile.myGymClimbIds) {
    await Promise.all(
      profile.myGymClimbIds.map(async climbId => {
        const climb = await findByClimbId(climbId);
        climbs.push(climb);
      }),
    );
  }

  return climbs;
};

const findAllClimbs = async () => {
  return await GymClimbDatas.find({}); //collections.climbs.find({}).toArray();
};

const addClimb = async (profileId: string | ObjectId, climb: GymClimb) => {
  await GymClimbDatas.validate(climb);

  const result = await GymClimbDatas.collection.insertOne(climb);

  await profileService.addGymClimb(profileId, result.insertedId);

  return result;
};

const updateClimb = async (id: string | ObjectId, climb: GymClimb) => {
  await GymClimbDatas.validate(climb);

  return await GymClimbDatas.findByIdAndUpdate(
    { _id: new ObjectId(id) },
    { $set: climb },
  );
};

const deleteClimb = async (
  id: string | ObjectId,
  profileId: string | ObjectId,
) => {
  const result = await GymClimbDatas.deleteOne({ _id: new ObjectId(id) });

  await profileService.removeGymClimb(profileId, id);

  return result;
};

const climbsService = {
  findByClimbId,
  findByProfileId,
  addClimb,
  updateClimb,
  deleteClimb,
  findAllClimbs,
};

export default climbsService;
