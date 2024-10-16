import Preferences, {
  BoulderingScales,
  ClimbingScales,
  Preference,
  Units,
} from '../../../Models/Profile/Preferences';
import { collections } from '../../utility/database.service';
import { ObjectId } from 'mongodb';

const findByProfileId = async (profileId: string | ObjectId) => {
  try {
    const response = (await Preferences.findOne({
      profileId: new ObjectId(profileId),
    })) as unknown as Preference;
    return response;
  } catch (error) {
    throw error;
  }
};

const add = async (preferences: Preference) => {
  try {
    const response = await Preferences.collection.insertOne(preferences);
    return response;
  } catch (error) {
    throw error;
  }
};

const update = async (
  profileId: string | ObjectId,
  preferences: Preference,
) => {
  try {
    const response = await Preferences.updateOne(
      { profileId: new ObjectId(profileId) },
      { $set: preferences },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const addDefaultPreferences = async (profileId: string | ObjectId) => {
  try {
    const preferences: Preference = {
      profileId: new ObjectId(profileId),
      Units: Units.Imperial,
      ClimbingScale: ClimbingScales.Yosemite,
      BoulderScale: BoulderingScales.Hueco,
    };

    const response = await Preferences.collection.insertOne(preferences);

    return response;
  } catch (error) {
    throw error;
  }
};

const preferencesService = {
  findByProfileId,
  add,
  update,
  addDefaultPreferences,
};

export default preferencesService;
