import { ObjectId } from 'mongodb';
import Climbs from '../../../../Models/Climbs/Climb';
import { Types } from 'mongoose';
import { fillMonths, fillWeeks } from '../../../../utils/fillTimeframe';

const getClimbsPerMonth = async (profileId: ObjectId | string) => {
  try {
    const currentDate = new Date();

    // Calculate the start date (30 days ago) and the end date (end of the current month)
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 28,
    );

    const weeks = fillWeeks(startDate);

    const response = await Climbs.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(profileId.toString()),
        },
      },

      {
        $match: {
          createdAt: {
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%m/%d',
              date: {
                $dateFromParts: {
                  isoWeekYear: { $isoWeekYear: '$createdAt' },
                  isoWeek: { $isoWeek: '$createdAt' },
                },
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Fill in missing weeks with count 0
    const result = weeks.map(week => {
      const found = response.find(r => r._id === week.label);
      return {
        _id: week.label,
        count: found ? found.count : 0,
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const getClimbsPer6Months = async (profileId: ObjectId | string) => {
  try {
    const currentDate = new Date();

    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 6,
      1,
    );

    const months = fillMonths(startDate);

    const response = await Climbs.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(profileId.toString()),
        },
      },
      {
        $match: {
          createdAt: {
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%m/%d',
              date: {
                $dateFromParts: {
                  year: { $year: '$createdAt' },
                  month: { $month: '$createdAt' },
                },
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const result = months.map(month => {
      const found = response.find(r => r._id === month.label);
      return {
        _id: month.label,
        count: found ? found.count : 0,
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const getClimbsPerYear = async (profileId: ObjectId | string) => {
  try {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      1,
    );

    const months = fillMonths(startDate);

    const response = await Climbs.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(profileId.toString()),
        },
      },
      {
        $match: {
          createdAt: {
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%m/%d',
              date: {
                $dateFromParts: {
                  year: { $year: '$createdAt' },
                  month: { $month: '$createdAt' },
                },
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const result = months.map(month => {
      const found = response.find(r => r._id === month.label);
      return {
        _id: month.label,
        count: found ? found.count : 0,
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const allTimeClimbs = async (profileId: ObjectId | string) => {
  try {
    const response = await Climbs.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(profileId.toString()),
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m',
              date: {
                $dateFromParts: {
                  year: { $year: '$createdAt' },
                  month: {
                    $subtract: [
                      { $month: '$createdAt' },
                      { $mod: [{ $month: '$createdAt' }, 3] },
                    ],
                  },
                },
              },
            },
          },
          count: { $sum: 1 },
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

const climbsDataTimeService = {
  getClimbsPerMonth,
  getClimbsPer6Months,
  getClimbsPerYear,
  allTimeClimbs,
};

export default climbsDataTimeService;
