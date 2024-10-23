import { ObjectId, Types } from 'mongoose';
import Climbs from '../../../../Models/Climbs/Climb';
import OutdoorClimbDatas from '../../../../Models/Climbs/OutdoorData';
import {
  get6monthPipeline,
  getMonthPipeline,
  getYearPipeline,
} from '../../../../utils/timeframePipelines';

const successRatePerDifficulty = async (
  profileId: string | ObjectId,
  timeframe: 'month' | '6 months' | 'year' | 'all time',
) => {
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
      _id: '$difficulty',
      successRate: {
        $avg: {
          $cond: {
            if: { $eq: ['$numberOfAttempts', null] }, // check if attempts is 0
            then: 1,
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
        $sum: {
          $cond: {
            if: { $eq: ['$numberOfAttempts', null] }, // check if attempts is 0
            then: 0,
            else: {
              $sum: '$numberOfAttempts', // total number of attempts
            },
          },
        },
      },
    },
  });

  return await OutdoorClimbDatas.aggregate(pipeline);
};

const successRatePerRockType = async (
  profileId: string | ObjectId,
  timeframe: 'month' | '6 months' | 'year' | 'all time',
) => {
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
      _id: '$rockType',
      successRate: {
        $avg: {
          $cond: {
            if: { $eq: ['$numberOfAttempts', null] }, // check if attempts is 0
            then: 1,
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
        $sum: {
          $cond: {
            if: { $eq: ['$numberOfAttempts', null] }, // check if attempts is 0
            then: 0,
            else: {
              $sum: '$numberOfAttempts', // total number of attempts
            },
          },
        },
      },
    },
  });

  return await OutdoorClimbDatas.aggregate(pipeline);
};

const successRatePerMoveType = async (
  profileId: string | ObjectId,
  timeframe: 'month' | '6 months' | 'year' | 'all time',
) => {
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

  pipeline.push(
    {
      $unwind: '$keyMoves',
    },
    {
      $group: {
        _id: '$keyMoves',
        successRate: {
          $avg: {
            $cond: {
              if: { $eq: ['$numberOfAttempts', null] }, // check if attempts is 0
              then: 1,
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
          $sum: {
            $cond: {
              if: { $eq: ['$numberOfAttempts', null] }, // check if attempts is 0
              then: 0,
              else: {
                $sum: '$numberOfAttempts', // total number of attempts
              },
            },
          },
        },
      },
    },
  );

  return await OutdoorClimbDatas.aggregate(pipeline);
};

const successRatePerType = async (
  profileId: string | ObjectId,
  timeframe: 'month' | '6 months' | 'year' | 'all time',
) => {
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
      successRate: {
        $avg: {
          $cond: {
            if: { $eq: ['$numberOfAttempts', null] }, // check if attempts is 0
            then: 1,
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
        $cond: {
          if: { $eq: ['$numberOfAttempts', null] }, // check if attempts is 0
          then: 0,
          else: {
            $sum: '$numberOfAttempts', // total number of attempts
          },
        },
      },
    },
  });

  return await OutdoorClimbDatas.aggregate(pipeline);
};

const outdoorSuccessRateService = {
  successRatePerDifficulty,
  successRatePerRockType,
  successRatePerMoveType,
  successRatePerType,
};

export default outdoorSuccessRateService;
