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

  const result = await OutdoorClimbDatas.updateOne(outdoorData);
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await OutdoorClimbDatas.deleteOne({ _id });
};

const outdoorClimbDataService = {
  findById,
  findByProfileId,
  findAll,
  add,
  update,
  remove,
};

export default outdoorClimbDataService;
