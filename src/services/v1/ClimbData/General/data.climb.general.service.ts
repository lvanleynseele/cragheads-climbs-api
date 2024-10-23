import { ObjectId, Types } from 'mongoose';
import Climbs from '../../../../Models/Climbs/Climb';
import Areas from '../../../../Models/Area/Area';

//for map of places climbed
const placesClimbed = async (profileId: string | ObjectId) => {
  return await Climbs.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(profileId.toString()),
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
        location: { $first: '$area.location' },
        isGym: { $first: '$area.isGym' },
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
        userId: new Types.ObjectId(profileId.toString()),
      },
    },
    {
      $group: {
        _id: '$isGymClimb',
        count: { $sum: 1 },
      },
    },
  ]);
};

const friendsClimbedWith = async (profileId: string | ObjectId) => {
  return await Climbs.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(profileId.toString()),
      },
    },
    { $unwind: '$friendIds' },
    {
      $lookup: {
        from: 'profiles',
        localField: 'friendIds',
        foreignField: '_id',
        as: 'friend',
      },
    },
    {
      $group: {
        _id: '$friend._id',
        friendName: { $first: '$friend.username' },
        count: { $sum: 1 },
      },
    },
  ]);
};

const climbDataGeneralService = {
  placesClimbed,
  gymVsOutdoor,
  friendsClimbedWith,
};

export default climbDataGeneralService;
