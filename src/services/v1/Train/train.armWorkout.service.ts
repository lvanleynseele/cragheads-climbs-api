import { ObjectId } from 'mongoose';
import ArmWorkoutDatas, {
  ArmWorkoutData,
} from '../../../Models/Training/ArmWorkoutData';

const findById = async (
  trainId: string | ObjectId,
): Promise<ArmWorkoutData | null> => {
  return await ArmWorkoutDatas.findById(trainId);
};

const findByProfileId: any = async (
  userId: string | ObjectId,
): Promise<ArmWorkoutData[]> => {
  return await ArmWorkoutDatas.find({ userId });
};

const findAll = async () => {
  return await ArmWorkoutDatas.find({});
};

const add = async (train: any) => {
  await ArmWorkoutDatas.validate(train);

  const result = await ArmWorkoutDatas.create(train);
  return result;
};

const update = async (train: any) => {
  await ArmWorkoutDatas.validate(train);

  const result = await ArmWorkoutDatas.updateOne(train);
  return result;
};

const remove = async (_id: string | ObjectId) => {
  return await ArmWorkoutDatas.deleteOne({ _id });
};

const armDataService = {
  findById,
  findByProfileId,
  findAll,
  add,
  update,
  remove,
};

export default armDataService;
