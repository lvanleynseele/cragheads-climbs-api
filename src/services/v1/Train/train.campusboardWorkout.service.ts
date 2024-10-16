import { ObjectId } from 'mongoose';

import CampusBoardDatas, {
  CampusBoardData,
} from '../../../Models/Training/CampusBoardData';

const findById = async (
  trainId: string | ObjectId,
): Promise<CampusBoardData | null> => {
  return await CampusBoardDatas.findById(trainId);
};

const findByProfileId: any = async (
  userId: string | ObjectId,
): Promise<CampusBoardData[]> => {
  return await CampusBoardDatas.find({ userId });
};

const findAll = async () => {
  return await CampusBoardDatas.find({});
};

const add = async (train: any) => {
  await CampusBoardDatas.validate(train);

  const result = await CampusBoardDatas.create(train);
  return result;
};

const update = async (train: any) => {
  await CampusBoardDatas.validate(train);

  const result = await CampusBoardDatas.updateOne(train);
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await CampusBoardDatas.deleteOne({ _id });
};

const campusboardDataService = {
  findById,
  findByProfileId,
  findAll,
  add,
  update,
  remove,
};

export default campusboardDataService;
