import { ObjectId } from 'mongoose';
import GymClimbDatas, { GymClimbData } from '../../../Models/Climbs/GymData';

const findById = async (climbId: string | ObjectId) => {
  return await GymClimbDatas.findById(climbId);
};

const findByProfileId = async (userId: string | ObjectId) => {
  return await GymClimbDatas.find({ userId });
};

const findByClimbId = async (climbId: string | ObjectId) => {
  return await GymClimbDatas.find({
    climbId,
  });
};

const findAll = async () => {
  return await GymClimbDatas.find({});
};

const add = async (gymData: GymClimbData) => {
  await GymClimbDatas.validate(gymData);

  return await GymClimbDatas.create(gymData);
};

const update = async (gymData: GymClimbData) => {
  await GymClimbDatas.validate(gymData);

  return await GymClimbDatas.updateOne({ _id: gymData._id }, { $set: gymData });
};

const remove = async (_id: string | ObjectId) => {
  return await GymClimbDatas.deleteOne({ _id });
};

const removeByClimbId = async (climbId: string | ObjectId) => {
  return await GymClimbDatas.deleteMany({ climbId });
};

const gymClimbDataService = {
  findById,
  findByProfileId,
  findByClimbId,
  findAll,
  add,
  update,
  remove,
  removeByClimbId,
};

export default gymClimbDataService;
