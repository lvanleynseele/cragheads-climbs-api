import { ObjectId, Types } from 'mongoose';
import { fillMonths, fillWeeks } from '../../../utils/fillTimeframe';
import HangBoardDatas from '../../../Models/Training/HangboardData';
import { profile } from 'console';
import CampusBoardDatas from '../../../Models/Training/CampusBoardData';

const hangboardTimePerMonth = async (profileId: ObjectId | string) => {
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 28,
  );

  const weeks = fillWeeks(startDate);

  const response = await HangBoardDatas.aggregate([
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
        gripType: { $first: '$hangBoardGripType' },
        holdType: { $first: '$hangBoardHoldType' },
        avgHangTime: {
          $avg: {
            $multiply: ['$duration', '$sets'],
          },
        },
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
      gripType: found ? found.gripType : '',
      holdType: found ? found.holdType : '',
      avgHangTime: found ? found.avgHangTime : 0,
    };
  });

  return result;
};

const hangboardTimePer6Months = async (profileId: ObjectId | string) => {
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 5,
    currentDate.getDate(),
  );

  const months = fillMonths(startDate);

  const response = await HangBoardDatas.aggregate([
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
        gripType: { $first: '$hangBoardGripType' },
        holdType: { $first: '$hangBoardHoldType' },
        avgHangTime: {
          $avg: {
            $multiply: ['$duration', '$sets'],
          },
        },
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
      gripType: found ? found.gripType : '',
      holdType: found ? found.holdType : '',
      avgHangTime: found ? found.avgHangTime : 0,
    };
  });

  return result;
};

const hangboardTimePerYear = async (profileId: ObjectId | string) => {
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  const months = fillMonths(startDate);

  const response = await HangBoardDatas.aggregate([
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
        gripType: { $first: '$hangBoardGripType' },
        holdType: { $first: '$hangBoardHoldType' },
        avgHangTime: {
          $avg: {
            $multiply: ['$duration', '$sets'],
          },
        },
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
      gripType: found ? found.gripType : '',
      holdType: found ? found.holdType : '',
      avgHangTime: found ? found.avgHangTime : 0,
    };
  });

  return result;
};

const hangboardTimePerAllTime = async (profileId: ObjectId | string) => {
  const response = await HangBoardDatas.aggregate([
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
        gripType: { $first: '$hangBoardGripType' },
        holdType: { $first: '$hangBoardHoldType' },
        avgHangTime: {
          $avg: {
            $multiply: ['$duration', '$sets'],
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return response;
};

const campusboardTimePerMonth = async (profileId: ObjectId | string) => {
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 28,
  );

  const weeks = fillWeeks(startDate);

  const response = await CampusBoardDatas.aggregate([
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
        gripType: { $first: '$gripType' },
        boardType: { $first: '$campusBoardType' },
        avgHangTime: {
          $avg: {
            $multiply: ['$duration', '$sets'],
          },
        },
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
      gripType: found ? found.gripType : '',
      holdType: found ? found.holdType : '',
      avgHangTime: found ? found.avgHangTime : 0,
    };
  });

  return result;
};

const camppusboardTimePer6Months = async (profileId: ObjectId | string) => {
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 5,
    currentDate.getDate(),
  );

  const months = fillMonths(startDate);

  const response = await CampusBoardDatas.aggregate([
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
        gripType: { $first: '$gripType' },
        boardType: { $first: '$campusBoardType' },
        avgHangTime: {
          $avg: {
            $multiply: ['$duration', '$sets'],
          },
        },
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
      gripType: found ? found.gripType : '',
      holdType: found ? found.holdType : '',
      avgHangTime: found ? found.avgHangTime : 0,
    };
  });

  return result;
};

const campusboardTimePerYear = async (profileId: ObjectId | string) => {
  const currentDate = new Date();
  const startDate = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  const months = fillMonths(startDate);

  const response = await HangBoardDatas.aggregate([
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
        gripType: { $first: '$gripType' },
        boardType: { $first: '$campusBoardType' },
        avgHangTime: {
          $avg: {
            $multiply: ['$duration', '$sets'],
          },
        },
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
      gripType: found ? found.gripType : '',
      holdType: found ? found.holdType : '',
      avgHangTime: found ? found.avgHangTime : 0,
    };
  });

  return result;
};

const campusboardTimePerAllTime = async (profileId: ObjectId | string) => {
  const response = await HangBoardDatas.aggregate([
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
        gripType: { $first: '$gripType' },
        boardType: { $first: '$campusBoardType' },
        avgHangTime: {
          $avg: {
            $multiply: ['$duration', '$sets'],
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return response;
};

const hangProgressionService = {
  hangboardTimePerMonth,
  hangboardTimePer6Months,
  hangboardTimePerYear,
  hangboardTimePerAllTime,
  campusboardTimePerMonth,
  camppusboardTimePer6Months,
  campusboardTimePerYear,
  campusboardTimePerAllTime,
};

export default hangProgressionService;
