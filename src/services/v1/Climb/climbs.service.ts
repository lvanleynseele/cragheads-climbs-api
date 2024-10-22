import { ObjectId, Types } from 'mongoose';
import Climbs, { Climb, ClimbResponse } from '../../../Models/Climbs/Climb';
import profileService from '../Profile/profile.service';
import gymClimbDataService from './climbs.gymData.service';
import outdoorClimbDataService from './climbs.outdoorData.service';
import { GymClimbData } from '../../../Models/Climbs/GymData';
import { OutdoorClimbData } from '../../../Models/Climbs/OutdoorData';
import areaInteractionService from '../Area/area.interactions.service';
import { AreaInteractionTypes } from '../../../constants/enums';
import routeInteractionService from '../Route/routes.interactions.service';

const findById = async (climbId: string | ObjectId) => {
  return await Climbs.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(climbId.toString()),
      },
    },
    {
      $lookup: {
        from: 'gymclimbdatas',
        localField: '_id',
        foreignField: 'climbId',
        as: 'gymDatas',
      },
    },
    {
      $lookup: {
        from: 'outdoorclimbdatas',
        localField: '_id',
        foreignField: 'climbId',
        as: 'outdoorDatas',
      },
    },
  ]);
};

const findByProfileId = async (userId: string | ObjectId) =>
  //: Promise<ClimbResponse[]>
  {
    return await Climbs.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId.toString()),
        },
      },
      {
        $lookup: {
          from: 'gymclimbdatas',
          localField: '_id',
          foreignField: 'climbId',
          as: 'gymDatas',
        },
      },
      {
        $lookup: {
          from: 'outdoorclimbdatas',
          localField: '_id',
          foreignField: 'climbId',
          as: 'outdoorDatas',
        },
      },
    ]);
  };

const findAllClimbs = async (): Promise<Climb[]> => {
  return await Climbs.find({});
};

const addClimb = async (
  profileId: string | ObjectId,
  climb: Climb,
  gymData?: GymClimbData[],
  outdoorData?: OutdoorClimbData[],
): Promise<Climb> => {
  await Climbs.validate(climb);

  const result = await Climbs.create(climb);

  if (gymData) {
    const gymResponse = await Promise.all(
      gymData.map(async data => {
        data.climbId = result._id;

        return await gymClimbDataService.add(data);
      }),
    );

    result.gymDataIds = gymResponse.map(data => data._id);
  }

  if (outdoorData) {
    const outdoorResponse = await Promise.all(
      outdoorData.map(async data => {
        data.climbId = result._id;
        return await outdoorClimbDataService.add(data);
      }),
    );

    result.outdoorDataIds = outdoorResponse.map(data => data._id);
  }

  result.save();

  await profileService.addClimb(profileId, result._id);

  handleAddClimbInteractions(profileId, result, outdoorData);

  return result;
};

const handleAddClimbInteractions = (
  profileId: string | ObjectId,
  climb: Climb,
  outdoorData?: OutdoorClimbData[],
) => {
  areaInteractionService.addInteraction(
    climb.areaId,
    AreaInteractionTypes.CLIMB,
    profileId,
  );

  outdoorData?.forEach(data => {
    areaInteractionService.addInteraction(
      data.routeId,
      AreaInteractionTypes.CLIMB,
      profileId,
    );
  });

  if (climb.images) {
    climb.images.forEach(() => {
      areaInteractionService.addInteraction(
        climb.areaId,
        AreaInteractionTypes.PHOTO,
        profileId,
      );
    });
  }
};

const updateClimb = async (
  id: string | ObjectId,
  climb: Climb,
): Promise<Climb | null> => {
  await Climbs.validate(climb);

  return await Climbs.findByIdAndUpdate({ _id: id }, { $set: climb });
};

const deleteClimb = async (
  id: string | ObjectId,
  profileId: string | ObjectId,
): Promise<Climb | null> => {
  const result = await Climbs.findByIdAndDelete({ _id: id });
  await gymClimbDataService.removeByClimbId(id);
  await outdoorClimbDataService.removeByClimbId(id);

  await profileService.removeClimb(profileId, id);

  return result;
};

const climbsService = {
  findById,
  findByProfileId,
  addClimb,
  updateClimb,
  deleteClimb,
  findAllClimbs,
};

export default climbsService;
