import { ObjectId } from 'mongoose';
import Climbs from '../../../../Models/Climbs/Climb';
import OutdoorClimbDatas from '../../../../Models/Climbs/OutdoorData';

const getMonthPipeline = () => {
  const currentDate = new Date();

  // Calculate the start date (30 days ago) and the end date (end of the current month)
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 30,
  );

  const pipeline = {
    $match: {
      createdAt: {
        $gte: startDate,
      },
    },
  };

  return pipeline;
};

const successRatePerDifficulty = async (
  profileId: string | ObjectId,
  timeframe: 'month' | '6 months' | 'year' | 'all time',
) => {
  const pipeline: any = [
    {
      $match: {
        userId: profileId,
      },
    },
  ];

  if (timeframe === 'month') {
    pipeline.push(getMonthPipeline());
  }

  return await OutdoorClimbDatas.aggregate([
    {
      $match: {
        userId: profileId,
      },
    },
    {
      $group: {
        _id: '$difficulty',
        successRate: {
          $avg: {
            $cond: {
              if: { $eq: ['$didSend', 0] },
              then: 0,
              else: { $divide: ['$didSend', '$numberOfAttempts'] },
            },
          },
        },

        success: {
          $sum: { $didSend: 1 },
        },
        numberOfAttempts: {
          $sum: '$numberOfAttempts',
        },
      },
    },
  ]);
};

const successRatePerRockType = async (profileId: string | ObjectId) => {
  return await OutdoorClimbDatas.aggregate([
    {
      $match: {
        userId: profileId,
      },
    },
    {
      $group: {
        _id: '$rockType',
        successRate: {
          $avg: {
            $cond: {
              if: { $eq: ['$didSend', 0] },
              then: 0,
              else: { $divide: ['$didSend', '$numberOfAttempts'] },
            },
          },
        },
      },
    },
  ]);
};

const successRatePerMoveType = async (profileId: string | ObjectId) => {
  return await OutdoorClimbDatas.aggregate([
    {
      $match: {
        userId: profileId,
      },
    },
    {
      $unwind: '$keyMoves',
    },
    {
      $group: {
        _id: '$keyMoves',
        successRate: {
          $avg: {
            $cond: {
              if: { $eq: ['$didSend', false] },
              then: 0,
              else: { $divide: ['$didSend', '$numberOfAttempts'] },
            },
          },
        },
      },
    },
  ]);
};

//for map of places climbed
const placesClimbed = async (profileId: string | ObjectId) => {
  return await Climbs.aggregate([
    {
      $match: {
        userId: profileId,
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
        count: { $sum: 1 },
      },
    },
  ]);
};
