import { ObjectId, Types } from 'mongoose';
import profileService from '../Profile/profile.service';
import TrainingDatas, {
  TrainingData,
  TrainingDataResponse,
} from '../../../Models/Training/Train';
import armDataService from './train.armWorkout.service';
import legDataService from './train.legWorkout.service';
import campusboardDataService from './train.campusboardWorkout.service';
import hangboardDataService from './train.hangboardWorkout.service';
import cardioDataService from './train.cardioWorkout.service';
import { LegWorkoutData } from '../../../Models/Training/LegWorkoutData';
import { HangBoardData } from '../../../Models/Training/HangboardData';
import { CardioWorkoutData } from '../../../Models/Training/CardioData';
import { CampusBoardData } from '../../../Models/Training/CampusBoardData';
import { ArmWorkoutData } from '../../../Models/Training/ArmWorkoutData';

const findById = async (trainingId: string | ObjectId) => {
  return await TrainingDatas.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(trainingId.toString()),
      },
    },

    {
      $lookup: {
        from: 'armworkoutdatas',
        localField: 'armDataIds',
        foreignField: '_id',
        as: 'armData',
      },
    },
    {
      $lookup: {
        from: 'campusboardworkoutdatas',
        localField: 'campusboardDataIds',
        foreignField: '_id',
        as: 'campusboardData',
      },
    },
    {
      $lookup: {
        from: 'hangboardworkoutdatas',
        localField: 'hangboardDataIds',
        foreignField: '_id',
        as: 'hangboardData',
      },
    },
    {
      $lookup: {
        from: 'cardioworkoutdatas',
        localField: 'cardioDataIds',
        foreignField: '_id',
        as: 'cardioData',
      },
    },
    {
      $lookup: {
        from: 'legworkoutdatas',
        localField: 'legDataIds',
        foreignField: '_id',
        as: 'legData',
      },
    },
  ]);
};

const findByProfileId = async (profileId: string | ObjectId) => {
  return await TrainingDatas.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(profileId.toString()),
      },
    },

    {
      $lookup: {
        from: 'armworkoutdatas',
        localField: 'armDataIds',
        foreignField: '_id',
        as: 'armData',
      },
    },
    {
      $lookup: {
        from: 'campusboardworkoutdatas',
        localField: 'campusboardDataIds',
        foreignField: '_id',
        as: 'campusboardData',
      },
    },
    {
      $lookup: {
        from: 'hangboardworkoutdatas',
        localField: 'hangboardDataIds',
        foreignField: '_id',
        as: 'hangboardData',
      },
    },
    {
      $lookup: {
        from: 'cardioworkoutdatas',
        localField: 'cardioDataIds',
        foreignField: '_id',
        as: 'cardioData',
      },
    },
    {
      $lookup: {
        from: 'legworkoutdatas',
        localField: 'legDataIds',
        foreignField: '_id',
        as: 'legData',
      },
    },
  ]);
};

const findAllTrains = async (): Promise<TrainingData[]> => {
  return await TrainingDatas.find({});
};

const addTraining = async (
  profileId: string | ObjectId,
  train: TrainingData,
  armData?: ArmWorkoutData[],
  campusboardData?: CampusBoardData[],
  cardioData?: CardioWorkoutData[],
  hangboardData?: HangBoardData[],
  legData?: LegWorkoutData[],
): Promise<TrainingData> => {
  await TrainingDatas.validate(train);

  const result = await TrainingDatas.create(train);

  if (armData) {
    const armResponse = await Promise.all(
      armData.map(async data => {
        data.trainingId = result._id;
        return await armDataService.add(data);
      }),
    );

    result.armDataIds = armResponse.map(data => data._id);
  }

  if (campusboardData) {
    const campusboardResponse = await Promise.all(
      campusboardData.map(async data => {
        data.trainingId = result._id;
        return await campusboardDataService.add(data);
      }),
    );

    result.campusboardDataIds = campusboardResponse.map(data => data._id);
  }

  if (cardioData) {
    const cardioResponse = await Promise.all(
      cardioData.map(async data => {
        data.trainingId = result._id;
        return await cardioDataService.add(data);
      }),
    );

    result.cardioDataIds = cardioResponse.map(data => data._id);
  }

  if (hangboardData) {
    const hangboardResponse = await Promise.all(
      hangboardData.map(async data => {
        data.trainingId = result._id;
        return await hangboardDataService.add(data);
      }),
    );

    result.hangboardDataIds = hangboardResponse.map(data => data._id);
  }

  if (legData) {
    const legResponse = await Promise.all(
      legData.map(async data => {
        data.trainingId = result._id;
        return await legDataService.add(data);
      }),
    );

    result.legDataIds = legResponse.map(data => data._id);
  }

  result.save();
  await profileService.addTraining(profileId, result._id);

  return result;
};

//add separate router for updating each workout type
const updateTrain = async (
  id: string | ObjectId,
  train: TrainingData,
): Promise<TrainingData | null> => {
  await TrainingDatas.validate(train);

  return await TrainingDatas.findByIdAndUpdate({ _id: id }, { $set: train });
};

const deleteTrain = async (
  id: string | ObjectId,
  profileId: string | ObjectId,
): Promise<TrainingData | null> => {
  const result = await TrainingDatas.findByIdAndDelete({ _id: id });

  if (!result) {
    throw new Error('Climb not found');
  }
  await armDataService.removeByTrainingId(id);
  await campusboardDataService.removeByTrainingId(id);
  await cardioDataService.removeByTrainingId(id);
  await hangboardDataService.removeByTrainingId(id);
  await legDataService.removeByTrainingId(id);
  await profileService.removeTraining(profileId, id);

  return result;
};

const last3Locations = async (profileId: string | ObjectId) => {
  const trainings = await TrainingDatas.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(profileId.toString()),
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: '$gymId',
        createdAt: { $first: '$createdAt' },
      },
    },
    {
      $limit: 3,
    },
    {
      $lookup: {
        from: 'areas',
        localField: '_id',
        foreignField: '_id',
        as: 'gym',
      },
    },
    {
      $unwind: '$gym', // Deconstructs the gym array
    },
    {
      $project: {
        gym: 1, // Only return the gym object
      },
    },
  ]);

  return trainings.map(item => item.gym);
};

const trainingService = {
  findById,
  findByProfileId,
  addTraining,
  updateTrain,
  deleteTrain,
  findAllTrains,
  last3Locations,
};

export default trainingService;
