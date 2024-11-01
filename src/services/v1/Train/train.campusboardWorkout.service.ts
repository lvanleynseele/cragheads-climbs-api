import { ObjectId } from 'mongoose';

import CampusBoardDatas, {
  CampusBoardData,
} from '../../../Models/Training/CampusBoardData';

const findById = async (
  trainId: string | ObjectId,
): Promise<CampusBoardData | null> => {
  return await CampusBoardDatas.findById(trainId);
};

const findByProfileId = async (
  userId: string | ObjectId,
): Promise<CampusBoardData[]> => {
  return await CampusBoardDatas.find({ userId });
};

const findAll = async () => {
  return await CampusBoardDatas.find({});
};

const add = async (campus: CampusBoardData) => {
  await CampusBoardDatas.validate(campus);

  const result = await CampusBoardDatas.create(campus);
  return result;
};

const update = async (campus: CampusBoardData) => {
  await CampusBoardDatas.validate(campus);

  const result = await CampusBoardDatas.updateOne(campus);
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await CampusBoardDatas.deleteOne({ _id });
};

const removeByTrainingId = async (trainingId: string | ObjectId) => {
  return await CampusBoardDatas.deleteMany({ trainingId });
};

const campusboardDataService = {
  findById,
  findByProfileId,
  findAll,
  add,
  update,
  remove,
  removeByTrainingId,
};

export default campusboardDataService;
