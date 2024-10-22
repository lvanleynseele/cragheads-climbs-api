import { ObjectId } from 'mongoose';
import Climbs from '../../../Models/Climbs/Climb';

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

//for slider of distribution of gym vs outdoor climbs
const gymVsOutdoor = async (profileId: string | ObjectId) => {
  return await Climbs.aggregate([
    {
      $match: {
        userId: profileId,
      },
    },
    {
      $group: {
        _id: '$isGym',
        count: { $sum: 1 },
      },
    },
  ]);
};

const climbDataGeneralService = {
  placesClimbed,
  gymVsOutdoor,
};
