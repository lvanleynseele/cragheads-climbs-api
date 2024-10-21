import { ObjectId } from 'mongoose';
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
  const climb = await Climbs.findById(climbId);
  if (!climb) {
    throw new Error('Climb not found');
  }

  if (climb.isGymClimb) {
    const gymData = await gymClimbDataService.findByClimbId(climbId);
    if (gymData.length > 0) {
      return { climb, gymData };
    }
  } else {
    const outdoorData = await outdoorClimbDataService.findByClimbId(climbId);
    if (outdoorData.length > 0) {
      return { climb, outdoorData };
    }
  }

  return { climb };
};

const findByProfileId = async (userId: string | ObjectId) =>
  //: Promise<ClimbResponse[]>
  {
    return await Climbs.find({ userId });

    //// match on userid not working
    // return await Climbs.aggregate([
    //   // {
    //   //   $match: {
    //   //     userId,
    //   //   },
    //   // },
    //   {
    //     $lookup: {
    //       from: 'gymclimbdatas',
    //       localField: '_id',
    //       foreignField: 'climbId',
    //       as: 'gymDatas',
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'outdoorclimbdatas',
    //       localField: '_id',
    //       foreignField: 'climbId',
    //       as: 'outdoorDatas',
    //     },
    //   },
    // ]);
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
    routeInteractionService.addInteraction(
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
  gymData?: GymClimbData,
  outdoorData?: OutdoorClimbData,
): Promise<Climb | null> => {
  await Climbs.validate(climb);

  if (gymData) {
    await gymClimbDataService.update(gymData);
  }

  if (outdoorData) {
    await outdoorClimbDataService.update(outdoorData);
  }

  return await Climbs.findByIdAndUpdate({ _id: id }, { $set: climb });
};

const deleteClimb = async (
  id: string | ObjectId,
  profileId: string | ObjectId,
): Promise<Climb | null> => {
  const result = await Climbs.findByIdAndDelete({ _id: id });
  if (result && result.gymDataIds) {
    await Promise.all(
      result.gymDataIds.map(async gymDataId => {
        await gymClimbDataService.remove(gymDataId);
      }),
    );
  }
  if (result && result.outdoorDataIds) {
    await Promise.all(
      result.outdoorDataIds.map(async outdoorDataId => {
        await outdoorClimbDataService.remove(outdoorDataId);
      }),
    );
  }

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
