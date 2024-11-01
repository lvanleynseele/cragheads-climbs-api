import { ObjectId } from 'mongoose';
import CardioWorkoutDatas, {
  CardioWorkoutData,
} from '../../../Models/Training/CardioData';

const findById = async (
  trainId: string | ObjectId,
): Promise<CardioWorkoutData | null> => {
  return await CardioWorkoutDatas.findById(trainId);
};

const findByProfileId = async (
  userId: string | ObjectId,
): Promise<CardioWorkoutData[]> => {
  return await CardioWorkoutDatas.find({ userId });
};

const findAll = async () => {
  return await CardioWorkoutDatas.find({});
};

const add = async (cardio: CardioWorkoutData) => {
  await CardioWorkoutDatas.validate(cardio);

  const result = await CardioWorkoutDatas.create(cardio);
  return result;
};

const update = async (cardio: CardioWorkoutData) => {
  await CardioWorkoutDatas.validate(cardio);

  const result = await CardioWorkoutDatas.updateOne(cardio);
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await CardioWorkoutDatas.deleteOne({ _id });
};

const removeByTrainingId = async (trainingId: string | ObjectId) => {
  return await CardioWorkoutDatas.deleteMany({ trainingId });
};

const cardioDataService = {
  findById,
  findByProfileId,
  findAll,
  add,
  update,
  remove,
  removeByTrainingId,
};

export default cardioDataService;
