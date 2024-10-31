import { ObjectId, Types } from 'mongoose';
import OutdoorClimbDatas from '../../../../Models/Climbs/OutdoorData';

const getClimbsDifficultyMonth = async (profileId: ObjectId | string) => {
  try {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 28,
    );

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

    const response = await OutdoorClimbDatas.aggregate([
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
        $match: {
          type: { $ne: 'Bouldering' },
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
          difficulty: { $avg: '$difficulty' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const result = weeks.map(week => {
      const found = response.find(r => r._id === week.label);
      return {
        _id: week.label,
        avgDifficulty: found ? found.difficulty : 0,
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const getClimbsDifficulty6Month = async (profileId: ObjectId | string) => {
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

  const response = await OutdoorClimbDatas.aggregate([
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
        difficulty: { $avg: '$difficulty' },
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
      avgDifficulty: found ? found.difficulty : 0,
    };
  });

  return result;
};

const getClimbsDifficultyYear = async (profileId: ObjectId | string) => {
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

    const response = await OutdoorClimbDatas.aggregate([
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
          difficulty: { $avg: '$difficulty' },
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
        avgDifficulty: found ? found.difficulty : 0,
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const getClimbsDifficultyAllTime = async (profileId: ObjectId | string) => {
  try {
    console.log('profileId', profileId);
    return await OutdoorClimbDatas.aggregate([
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
          avgDifficulty: { $avg: '$difficulty' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
  } catch (error) {
    throw error;
  }
};

const outdoorAvgDataDifficultyService = {
  getClimbsDifficultyMonth,
  getClimbsDifficulty6Month,
  getClimbsDifficultyYear,
  getClimbsDifficultyAllTime,
};

export default outdoorAvgDataDifficultyService;
