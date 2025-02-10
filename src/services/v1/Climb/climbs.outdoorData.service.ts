import { ObjectId } from 'mongoose';
import OutdoorClimbDatas, {
  OutdoorClimbData,
} from '../../../Models/Climbs/OutdoorData';

const findById = async (climbId: string | ObjectId) => {
  return await OutdoorClimbDatas.findById(climbId);
};

const findByProfileId = async (userId: string | ObjectId) => {
  return await OutdoorClimbDatas.find({ userId });
};

const findByClimbId = async (climbId: string | ObjectId) => {
  return await OutdoorClimbDatas.find({
    climbId,
  });
};

const findAll = async () => {
  return await OutdoorClimbDatas.find({});
};

const add = async (outdoorData: OutdoorClimbData) => {
  await OutdoorClimbDatas.validate(outdoorData);

  const result = await OutdoorClimbDatas.create(outdoorData);
  return result;
};

const update = async (outdoorData: OutdoorClimbData) => {
  await OutdoorClimbDatas.validate(outdoorData);

  const result = await OutdoorClimbDatas.updateOne(
    { _id: outdoorData._id },
    { $set: outdoorData },
  );
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await OutdoorClimbDatas.deleteOne({ _id });
};

const removeByClimbId = async (climbId: string | ObjectId) => {
  return await OutdoorClimbDatas.deleteMany({ climbId });
};

const outdoorClimbDataService = {
  findById,
  findByProfileId,
  findByClimbId,
  findAll,
  add,
  update,
  remove,
  removeByClimbId,
};

export default outdoorClimbDataService;
