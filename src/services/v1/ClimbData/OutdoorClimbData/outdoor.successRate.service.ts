import { ObjectId, Types } from 'mongoose';
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
        userId: new Types.ObjectId(profileId.toString()),
      },
    },
    {
      $group: {
        _id: '$difficulty',
        successRate: {
          $avg: {
            $cond: {
              if: { $eq: ['$numberOfAttempts', 0] }, // check if attempts is 0
              then: 0,
              else: {
                $divide: [
                  { $sum: { $cond: [{ $eq: ['$didSend', true] }, 1, 0] } }, // sum of successful sends
                  { $sum: '$numberOfAttempts' }, // sum of attempts
                ],
              },
            },
          },
        },
        totalSends: {
          $sum: { $cond: [{ $eq: ['$didSend', true] }, 1, 0] }, // total number of sends
        },
        totalAttempts: {
          $sum: '$numberOfAttempts', // total number of attempts
        },
      },
    },
  ]);
};

const successRatePerRockType = async (profileId: string | ObjectId) => {
  return await OutdoorClimbDatas.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(profileId.toString()),
      },
    },
    {
      $group: {
        _id: '$rockType',
        successRate: {
          $avg: {
            $cond: {
              if: { $eq: ['$numberOfAttempts', 0] }, // check if attempts is 0
              then: 0,
              else: {
                $divide: [
                  { $sum: { $cond: [{ $eq: ['$didSend', true] }, 1, 0] } }, // sum of successful sends
                  { $sum: '$numberOfAttempts' }, // sum of attempts
                ],
              },
            },
          },
        },
        totalSends: {
          $sum: { $cond: [{ $eq: ['$didSend', true] }, 1, 0] }, // total number of sends
        },
        totalAttempts: {
          $sum: '$numberOfAttempts', // total number of attempts
        },
      },
    },
  ]);
};

const successRatePerMoveType = async (profileId: string | ObjectId) => {
  return await OutdoorClimbDatas.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(profileId.toString()),
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
              if: { $eq: ['$numberOfAttempts', 0] }, // check if attempts is 0
              then: 0,
              else: {
                $divide: [
                  { $sum: { $cond: [{ $eq: ['$didSend', true] }, 1, 0] } }, // sum of successful sends
                  { $sum: '$numberOfAttempts' }, // sum of attempts
                ],
              },
            },
          },
        },
        totalSends: {
          $sum: { $cond: [{ $eq: ['$didSend', true] }, 1, 0] }, // total number of sends
        },
        totalAttempts: {
          $sum: '$numberOfAttempts', // total number of attempts
        },
      },
    },
  ]);
};

const outdoorSuccessRateService = {
  successRatePerDifficulty,
  successRatePerRockType,
  successRatePerMoveType,
};

export default outdoorSuccessRateService;
