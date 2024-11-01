import { ObjectId } from 'mongoose';

import LegWorkoutDatas, {
  LegWorkoutData,
} from '../../../Models/Training/LegWorkoutData';

const findById = async (
  trainId: string | ObjectId,
): Promise<LegWorkoutData | null> => {
  return await LegWorkoutDatas.findById(trainId);
};

const findByProfileId = async (
  userId: string | ObjectId,
): Promise<LegWorkoutData[] | null> => {
  return await LegWorkoutDatas.find({ userId });
};

const findAll = async () => {
  return await LegWorkoutDatas.find({});
};

const add = async (legs: LegWorkoutData) => {
  await LegWorkoutDatas.validate(legs);

  const result = await LegWorkoutDatas.create(legs);
  return result;
};

const update = async (legs: LegWorkoutData) => {
  await LegWorkoutDatas.validate(legs);

  const result = await LegWorkoutDatas.updateOne(legs);
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await LegWorkoutDatas.deleteOne({ _id });
};

const removeByTrainingId = async (trainingId: string | ObjectId) => {
  return await LegWorkoutDatas.deleteMany({ trainingId });
};

const legDataService = {
  findById,
  findByProfileId,
  findAll,
  add,
  update,
  remove,
  removeByTrainingId,
};

export default legDataService;
