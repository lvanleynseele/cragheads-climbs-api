import { ObjectId } from 'mongodb';
import { collections } from '../../utility/database.service';
import Areas, { ClimbingArea } from '../../../Models/Area/Area';

const findById = async (id: string | ObjectId) => {
  const area = (await collections.areas.findOne({
    _id: new ObjectId(id),
  })) as unknown as ClimbingArea;
  return area;
};

const getByLocation = async (lat: string, long: string, radius: string) => {
  const areas = await collections.areas
    .find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(long), parseFloat(lat)],
          },
          $maxDistance: parseInt(radius),
        },
      },
    })
    .toArray();
  return areas;
};

const areaService = {
  findById,
  getByLocation,
};

export default areaService;
