import { ObjectId } from 'mongoose';
import { collections } from '../../utility/database.service';
import Climbs from '../../../Models/Climbs/Climb';

const getClimbsDifficultyMonth = async (profileId: ObjectId | string) => {
  try {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 30,
    );

    const response = await Climbs.aggregate([
      {
        $match: {
          userId: profileId,
        },
      },
      {
        $addFields: {
          formattedDate: {
            $dateFromString: {
              dateString: '$date',
            },
          },
        },
      },
      {
        $match: {
          formattedDate: {
            $gte: startDate,
          },
        },
      },
      {
        $unwind: '$routeIds',
      },
      {
        $addFields: {
          routeId: {
            $toObjectId: '$routeIds',
          },
        },
      },
      {
        $lookup: {
          from: 'routes',
          localField: 'routeId',
          foreignField: '_id',
          as: 'route',
        },
      },
      {
        $unwind: '$route',
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%m/%d',
              date: {
                $dateFromParts: {
                  isoWeekYear: { $isoWeekYear: '$formattedDate' },
                  isoWeek: { $isoWeek: '$formattedDate' },
                },
              },
            },
          },
          difficulty: { $avg: '$route.difficulty' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};

const getClimbsDifficulty6Month = async (profileId: ObjectId | string) => {
  try {
    const currentDate = new Date();
    const response = await Climbs.aggregate([
      {
        $match: {
          userId: profileId,
        },
      },
      {
        $addFields: {
          formattedDate: {
            $dateFromString: {
              dateString: '$date',
            },
          },
        },
      },
      {
        $match: {
          formattedDate: {
            $gte: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 6,
              1,
            ),
            $lt: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0,
            ),
          },
        },
      },
      {
        $unwind: '$routeIds',
      },
      {
        $addFields: {
          routeId: {
            $toObjectId: '$routeIds',
          },
        },
      },
      {
        $lookup: {
          from: 'routes',
          localField: 'routeId',
          foreignField: '_id',
          as: 'route',
        },
      },
      {
        $unwind: '$route',
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%m/%d',
              date: {
                $dateFromParts: {
                  year: { $year: '$formattedDate' },
                  month: { $month: '$formattedDate' },
                },
              },
            },
          },
          difficulty: { $avg: '$route.difficulty' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};

const getClimbsDifficultyYear = async (profileId: ObjectId | string) => {
  try {
    const currentDate = new Date();
    const response = await Climbs.aggregate([
      {
        $match: {
          userId: profileId,
        },
      },
      {
        $addFields: {
          formattedDate: {
            $dateFromString: {
              dateString: '$date',
            },
          },
        },
      },
      {
        $match: {
          formattedDate: {
            $gte: new Date(
              currentDate.getFullYear() - 1,
              currentDate.getMonth(),
              1,
            ),
            $lt: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0,
            ),
          },
        },
      },
      {
        $unwind: '$routeIds',
      },
      {
        $addFields: {
          routeId: {
            $toObjectId: '$routeIds',
          },
        },
      },
      {
        $lookup: {
          from: 'routes',
          localField: 'routeId',
          foreignField: '_id',
          as: 'route',
        },
      },
      {
        $unwind: '$route',
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%m/%d',
              date: {
                $dateFromParts: {
                  year: { $year: '$formattedDate' },
                  month: { $month: '$formattedDate' },
                },
              },
            },
          },
          difficulty: { $avg: '$route.difficulty' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};

const getClimbsDifficultyAllTime = async (profileId: ObjectId | string) => {
  try {
    const response = await Climbs.aggregate([
      {
        $match: {
          userId: profileId,
        },
      },
      {
        $addFields: {
          formattedDate: {
            $dateFromString: {
              dateString: '$date',
            },
          },
        },
      },
      {
        $unwind: '$routeIds',
      },
      {
        $addFields: {
          routeId: {
            $toObjectId: '$routeIds',
          },
        },
      },
      {
        $lookup: {
          from: 'routes',
          localField: 'routeId',
          foreignField: '_id',
          as: 'route',
        },
      },
      {
        $unwind: '$route',
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m',
              date: {
                $dateFromParts: {
                  year: { $year: '$formattedDate' },
                  month: {
                    $subtract: [
                      { $month: '$formattedDate' },
                      { $mod: [{ $month: '$formattedDate' }, 3] },
                    ],
                  },
                },
              },
            },
          },
          difficulty: { $avg: '$route.difficulty' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};

const climbsDataDifficultyService = {
  getClimbsDifficultyMonth,
  getClimbsDifficulty6Month,
  getClimbsDifficultyYear,
  getClimbsDifficultyAllTime,
};

export default climbsDataDifficultyService;
