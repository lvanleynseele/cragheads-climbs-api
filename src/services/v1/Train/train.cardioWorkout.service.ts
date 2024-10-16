import { ObjectId } from 'mongoose';
import CardioWorkoutDatas, {
  CardioWorkoutData,
} from '../../../Models/Training/CardioData';

const findById = async (
  trainId: string | ObjectId,
): Promise<CardioWorkoutData | null> => {
  return await CardioWorkoutDatas.findById(trainId);
};

const findByProfileId: any = async (
  userId: string | ObjectId,
): Promise<CardioWorkoutData[]> => {
  return await CardioWorkoutDatas.find({ userId });
};

const findAll = async () => {
  return await CardioWorkoutDatas.find({});
};

const add = async (train: any) => {
  await CardioWorkoutDatas.validate(train);

  const result = await CardioWorkoutDatas.create(train);
  return result;
};

const update = async (train: any) => {
  await CardioWorkoutDatas.validate(train);

  const result = await CardioWorkoutDatas.updateOne(train);
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await CardioWorkoutDatas.deleteOne({ _id });
};

const cardioDataService = {
  findById,
  findByProfileId,
  findAll,
  add,
  update,
  remove,
};

export default cardioDataService;
