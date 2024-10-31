import { ObjectId, Types } from 'mongoose';
import Climbs from '../../../../Models/Climbs/Climb';
import Areas from '../../../../Models/Area/Area';
import {
  get6monthPipeline,
  getMonthPipeline,
  getYearPipeline,
} from '../../../../utils/timeframePipelines';
import OutdoorClimbDatas from '../../../../Models/Climbs/OutdoorData';
import GymClimbDatas from '../../../../Models/Climbs/GymData';

//for map of places climbed
const placesClimbed = async (profileId: string | ObjectId) => {
  return await Climbs.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(profileId.toString()),
      },
    },
    {
      $lookup: {
        from: 'areas',
        localField: 'areaId',
        foreignField: '_id',
        as: 'area',
      },
    },
    {
      $group: {
        _id: '$area._id',
        location: { $first: '$area.location' },
        isGym: { $first: '$area.isGym' },
        count: { $sum: 1 },
      },
    },
  ]);
};

//for slider of distribution of gym vs outdoor climbs
const gymVsOutdoor = async (profileId: string | ObjectId) => {
  return await Climbs.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(profileId.toString()),
      },
    },
    {
      $group: {
        _id: '$isGymClimb',
        count: { $sum: 1 },
      },
    },
  ]);
};

const friendsClimbedWith = async (profileId: string | ObjectId) => {
  return await Climbs.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(profileId.toString()),
      },
    },
    { $unwind: '$friendIds' },
    {
      $lookup: {
        from: 'profiles',
        localField: 'friendIds',
        foreignField: '_id',
        as: 'friend',
      },
    },
    {
      $group: {
        _id: '$friend._id',
        friendName: { $first: '$friend.username' },
        count: { $sum: 1 },
      },
    },
  ]);
};

const outdoorClimbsByType = async (
  profileId: ObjectId | string,
  timeframe: 'month' | '6 months' | 'year' | 'all time',
) => {
  try {
    const currentDate = new Date();

    const pipeline: any = [
      {
        $match: {
          userId: new Types.ObjectId(profileId.toString()),
        },
      },
    ];

    switch (timeframe) {
      case 'month':
        pipeline.push(getMonthPipeline());
        break;
      case '6 months':
        pipeline.push(get6monthPipeline());
        break;
      case 'year':
        pipeline.push(getYearPipeline());
        break;
      default:
        break;
    }

    pipeline.push({
      $group: {
        _id: '$type',
        count: { $sum: 1 },
      },
    });

    return OutdoorClimbDatas.aggregate(pipeline);
  } catch (error) {
    throw error;
  }
};

const gymClimbsByType = async (
  profileId: ObjectId | string,
  timeframe: 'month' | '6 months' | 'year' | 'all time',
) => {
  try {
    const currentDate = new Date();

    const pipeline: any = [
      {
        $match: {
          userId: new Types.ObjectId(profileId.toString()),
        },
      },
    ];

    switch (timeframe) {
      case 'month':
        pipeline.push(getMonthPipeline());
        break;
      case '6 months':
        pipeline.push(get6monthPipeline());
        break;
      case 'year':
        pipeline.push(getYearPipeline());
        break;
      default:
        break;
    }

    pipeline.push({
      $group: {
        _id: '$type',
        count: { $sum: 1 },
      },
    });

    return GymClimbDatas.aggregate(pipeline);
  } catch (error) {
    throw error;
  }
};

const climbDataGeneralService = {
  placesClimbed,
  gymVsOutdoor,
  friendsClimbedWith,
  outdoorClimbsByType,
  gymClimbsByType,
};

export default climbDataGeneralService;
