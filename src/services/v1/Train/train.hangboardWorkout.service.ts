import { ObjectId } from 'mongoose';
import HangBoardDatas, {
  HangBoardData,
} from '../../../Models/Training/HangboardData';

const findById = async (
  trainId: string | ObjectId,
): Promise<HangBoardData | null> => {
  return await HangBoardDatas.findById(trainId);
};

const findByProfileId = async (
  userId: string | ObjectId,
): Promise<HangBoardData[]> => {
  return await HangBoardDatas.find({ userId });
};

const findAll = async () => {
  return await HangBoardDatas.find({});
};

const add = async (train: any) => {
  await HangBoardDatas.validate(train);

  const result = await HangBoardDatas.create(train);
  return result;
};

const update = async (train: any) => {
  await HangBoardDatas.validate(train);

  const result = await HangBoardDatas.updateOne(train);
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await HangBoardDatas.deleteOne({ _id });
};

const removeByTrainingId = async (trainingId: string | ObjectId) => {
  return await HangBoardDatas.deleteMany({ trainingId });
};

const hangboardDataService = {
  findById,
  findByProfileId,
  findAll,
  add,
  update,
  remove,
  removeByTrainingId,
};

export default hangboardDataService;
