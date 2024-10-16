import { ObjectId } from 'mongodb';
import Climbs from '../../../Models/Climbs/Climb';

const getClimbsPerMonth = async (profileId: ObjectId | string) => {
  try {
    const currentDate = new Date();

    // Calculate the start date (30 days ago) and the end date (end of the current month)
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 30,
    );

    // Adjust startDate to the previous Monday
    startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));

    // Generate all weeks within the date range, starting on Monday
    const weeks = [];
    let weekStart = new Date(startDate);
    while (weekStart <= currentDate) {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weeks.push({
        start: new Date(weekStart),
        end: new Date(weekEnd),
        label: `${String(weekStart.getMonth() + 1).padStart(2, '0')}/${String(
          weekStart.getDate(),
        ).padStart(2, '0')}`,
      });
      weekStart.setDate(weekStart.getDate() + 7);
    }

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

    //ensure start date is the first day of the month
    startDate.setDate(1);

    const months = [];
    let monthStart = new Date(startDate);
    while (monthStart <= currentDate) {
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);
      months.push({
        start: new Date(monthStart),
        end: new Date(monthEnd),
        label: `${String(monthStart.getMonth() + 1).padStart(2, '0')}/${String(
          monthStart.getDate(),
        ).padStart(2, '0')}`,
      });
      monthStart.setMonth(monthStart.getMonth() + 1);
    }

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

    //ensure start date is the first day of the month
    startDate.setDate(1);

    const months = [];
    let monthStart = new Date(startDate);
    while (monthStart <= currentDate) {
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);
      months.push({
        start: new Date(monthStart),
        end: new Date(monthEnd),
        label: `${String(monthStart.getMonth() + 1).padStart(2, '0')}/${String(
          monthStart.getDate(),
        ).padStart(2, '0')}`,
      });
      monthStart.setMonth(monthStart.getMonth() + 1);
    }

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
