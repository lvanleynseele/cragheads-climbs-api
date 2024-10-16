import { ObjectId } from 'mongodb';
import { collections } from '../../utility/database.service';
import areaService from '../Area/area.service';
import { ClimbingRoute } from '../../../Models/Routes/Route';

const getRouteById = async (id: string | ObjectId) => {
  return (await collections.routes.findOne({
    _id: new ObjectId(id),
  })) as unknown as ClimbingRoute;
};

const getRoutesByArea = async (areaId: string | ObjectId) => {
  const area = await areaService.findById(areaId);

  const routes: ClimbingRoute[] = [];
  if (area.routeIds) {
    await Promise.all(
      area.routeIds.map(async routeId => {
        const route = await getRouteById(routeId);
        routes.push(route);
      }),
    );
  }
  return routes;
};

const routeService = {
  getRouteById,
  getRoutesByArea,
};

export default routeService;
