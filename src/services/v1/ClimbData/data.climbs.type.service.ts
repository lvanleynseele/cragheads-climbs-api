import { ObjectId } from 'mongoose';
import { collections } from '../../utility/database.service';
import Climbs from '../../../Models/Climbs/Climb';

const getClimbsPerTypeMonth = async (profileId: ObjectId | string) => {
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
        $group: {
          _id: '$route.type',
          count: { $sum: 1 },
        },
      },
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};

const getClimbsPerType6Month = async (profileId: ObjectId | string) => {
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
        $group: {
          _id: '$route.type',
          count: { $sum: 1 },
        },
      },
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};

const getClimbsPerTypeYear = async (profileId: ObjectId | string) => {
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
        $group: {
          _id: '$route.type',
          count: { $sum: 1 },
        },
      },
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};

const getClimbsPerTypeAllTime = async (profileId: ObjectId | string) => {
  try {
    const response = await Climbs.aggregate([
      {
        $match: {
          userId: profileId,
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
        $group: {
          _id: '$route.type',
          count: { $sum: 1 },
        },
      },
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};

const climbsDataTypesService = {
  getClimbsPerTypeMonth,
  getClimbsPerType6Month,
  getClimbsPerTypeYear,
  getClimbsPerTypeAllTime,
};

export default climbsDataTypesService;
