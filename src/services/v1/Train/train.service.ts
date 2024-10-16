import { ObjectId } from 'mongoose';
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
  const training = await TrainingDatas.findById(trainingId);
  if (!training) {
    throw new Error('Climb not found');
  }

  const response: {
    train: typeof training;
    armData: any[];
    campusboardData: any[];
    hangboardData: any[];
    cardioData: any[];
    legData: any[];
  } = {
    train: training,
    armData: [],
    campusboardData: [],
    hangboardData: [],
    cardioData: [],
    legData: [],
  };

  if (training.armDataIds) {
    const armData = await Promise.all(
      training.armDataIds.map(async armDataId => {
        return await armDataService.findById(armDataId);
      }),
    );

    response.armData = armData;
  }

  if (training.campusboardDataIds) {
    const campusboardData = await Promise.all(
      training.campusboardDataIds.map(async campusboardDataId => {
        return await campusboardDataService.findById(campusboardDataId);
      }),
    );
    response.campusboardData = campusboardData;
  }

  if (training.hangboardDataIds) {
    const hangboardData = await Promise.all(
      training.hangboardDataIds.map(async hangboardDataId => {
        return await hangboardDataService.findById(hangboardDataId);
      }),
    );
    response.hangboardData = hangboardData;
  }

  if (training.cardioDataIds) {
    const cardioData = await Promise.all(
      training.cardioDataIds.map(async cardioDataId => {
        return await cardioDataService.findById(cardioDataId);
      }),
    );
    response.cardioData = cardioData;
  }

  if (training.legDataIds) {
    const legData = await Promise.all(
      training.legDataIds.map(async legDataId => {
        return await legDataService.findById(legDataId);
      }),
    );
    response.legData = legData;
  }

  return response;
};

const findByProfileId = async (profileId: string | ObjectId) => {
  const profile = await profileService.findProfileById(profileId);

  let trains: TrainingDataResponse[] = [];

  if (profile && profile.trainingIds) {
    await Promise.all(
      profile.trainingIds.map(async trainId => {
        const train = await findById(trainId);
        trains.push(train);
      }),
    );
  }

  return trains;
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

  if (armData) {
    const armResponse = await Promise.all(
      armData.map(async data => {
        return await armDataService.add(data);
      }),
    );

    train.armDataIds = armResponse.map(data => data._id);
  }

  if (campusboardData) {
    const campusboardResponse = await Promise.all(
      campusboardData.map(async data => {
        return await campusboardDataService.add(data);
      }),
    );

    train.campusboardDataIds = campusboardResponse.map(data => data._id);
  }

  if (cardioData) {
    const cardioResponse = await Promise.all(
      cardioData.map(async data => {
        return await cardioDataService.add(data);
      }),
    );

    train.cardioDataIds = cardioResponse.map(data => data._id);
  }

  if (hangboardData) {
    const hangboardResponse = await Promise.all(
      hangboardData.map(async data => {
        return await hangboardDataService.add(data);
      }),
    );

    train.hangboardDataIds = hangboardResponse.map(data => data._id);
  }

  if (legData) {
    const legResponse = await Promise.all(
      legData.map(async data => {
        return await legDataService.add(data);
      }),
    );

    train.legDataIds = legResponse.map(data => data._id);
  }

  const result = await TrainingDatas.create(train);

  await profileService.addTraining(profileId, result._id);

  return result;
};

const updateTrain = async (
  id: string | ObjectId,
  train: TrainingData,
  armData?: ArmWorkoutData[],
  campusboardData?: CampusBoardData[],
  cardioData?: CardioWorkoutData[],
  hangboardData?: HangBoardData[],
  legData?: LegWorkoutData[],
): Promise<TrainingData | null> => {
  await TrainingDatas.validate(train);

  if (armData) {
    await Promise.all(
      armData.map(async data => {
        await armDataService.update(data);
      }),
    );
  }

  if (campusboardData) {
    await Promise.all(
      campusboardData.map(async data => {
        await campusboardDataService.update(data);
      }),
    );
  }

  if (cardioData) {
    await Promise.all(
      cardioData.map(async data => {
        await cardioDataService.update(data);
      }),
    );
  }

  if (hangboardData) {
    await Promise.all(
      hangboardData.map(async data => {
        await hangboardDataService.update(data);
      }),
    );
  }

  if (legData) {
    await Promise.all(
      legData.map(async data => {
        await legDataService.update(data);
      }),
    );
  }

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

  if (result && result.armDataIds) {
    await Promise.all(
      result.armDataIds.map(async armDataId => {
        await armDataService.remove(armDataId);
      }),
    );
  }

  if (result && result.campusboardDataIds) {
    await Promise.all(
      result.campusboardDataIds.map(async campusboardDataId => {
        await campusboardDataService.remove(campusboardDataId);
      }),
    );
  }

  if (result && result.cardioDataIds) {
    await Promise.all(
      result.cardioDataIds.map(async cardioDataId => {
        await cardioDataService.remove(cardioDataId);
      }),
    );
  }

  if (result && result.hangboardDataIds) {
    await Promise.all(
      result.hangboardDataIds.map(async hangboardDataId => {
        await hangboardDataService.remove(hangboardDataId);
      }),
    );
  }

  if (result && result.legDataIds) {
    await Promise.all(
      result.legDataIds.map(async legDataId => {
        await legDataService.remove(legDataId);
      }),
    );
  }

  await profileService.removeTraining(profileId, id);

  return result;
};

const trainingService = {
  findById,
  findByProfileId,
  addTraining,
  updateTrain,
  deleteTrain,
  findAllTrains,
};

export default trainingService;
