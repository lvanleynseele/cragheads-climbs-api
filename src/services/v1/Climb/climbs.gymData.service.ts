import { ObjectId } from 'mongoose';
import GymClimbDatas, { GymClimbData } from '../../../Models/Climbs/GymData';

const findById = async (climbId: string | ObjectId) => {
  return await GymClimbDatas.findById(climbId);
};

const findByProfileId = async (userId: string | ObjectId) => {
  return await GymClimbDatas.find({ userId });
};

const findAll = async () => {
  return await GymClimbDatas.find({});
};

const add = async (gymData: GymClimbData) => {
  await GymClimbDatas.validate(gymData);

  const result = await GymClimbDatas.create(gymData);
  return result;
};

const update = async (gymData: GymClimbData) => {
  await GymClimbDatas.validate(gymData);

  const result = await GymClimbDatas.updateOne(gymData);
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await GymClimbDatas.deleteOne({ _id });
};

const gymClimbDataService = {
  findById,
  findByProfileId,
  findAll,
  add,
  update,
  remove,
};

export default gymClimbDataService;
