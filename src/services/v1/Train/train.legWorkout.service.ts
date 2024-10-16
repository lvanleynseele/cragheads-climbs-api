import { ObjectId } from 'mongoose';

import LegWorkoutDatas, {
  LegWorkoutData,
} from '../../../Models/Training/LegWorkoutData';

const findById = async (
  trainId: string | ObjectId,
): Promise<LegWorkoutData | null> => {
  return await LegWorkoutDatas.findById(trainId);
};

const findByProfileId: any = async (
  userId: string | ObjectId,
): Promise<LegWorkoutData[] | null> => {
  return await LegWorkoutDatas.find({ userId });
};

const findAll = async () => {
  return await LegWorkoutDatas.find({});
};

const add = async (train: any) => {
  await LegWorkoutDatas.validate(train);

  const result = await LegWorkoutDatas.create(train);
  return result;
};

const update = async (train: any) => {
  await LegWorkoutDatas.validate(train);

  const result = await LegWorkoutDatas.updateOne(train);
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await LegWorkoutDatas.deleteOne({ _id });
};

const legDataService = {
  findById,
  findByProfileId,
  findAll,
  add,
  update,
  remove,
};

export default legDataService;
