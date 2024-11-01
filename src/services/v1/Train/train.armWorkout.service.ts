import { ObjectId } from 'mongoose';
import ArmWorkoutDatas, {
  ArmWorkoutData,
} from '../../../Models/Training/ArmWorkoutData';

const findById = async (
  trainId: string | ObjectId,
): Promise<ArmWorkoutData | null> => {
  return await ArmWorkoutDatas.findById(trainId);
};

const findByProfileId = async (
  userId: string | ObjectId,
): Promise<ArmWorkoutData[]> => {
  return await ArmWorkoutDatas.find({ userId });
};

const findByTrainingId = async (trainingId: string | ObjectId) => {
  return await ArmWorkoutDatas.find({ trainingId });
};

const findAll = async () => {
  return await ArmWorkoutDatas.find({});
};

const add = async (arms: ArmWorkoutData) => {
  await ArmWorkoutDatas.validate(arms);

  const result = await ArmWorkoutDatas.create(arms);
  return result;
};

const update = async (arms: ArmWorkoutData) => {
  await ArmWorkoutDatas.validate(arms);

  const result = await ArmWorkoutDatas.updateOne(arms);
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await ArmWorkoutDatas.deleteOne({ _id });
};

const removeByTrainingId = async (trainingId: string | ObjectId) => {
  return await ArmWorkoutDatas.deleteMany({ trainingId });
};

const armDataService = {
  findById,
  findByProfileId,
  findByTrainingId,
  findAll,
  add,
  update,
  remove,
  removeByTrainingId,
};

export default armDataService;
