import { ClimbingTypes } from '../../constants/enums';
import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Route {
  _id: ObjectId;
  areaId: ObjectId;
  //details
  name: string;
  type: ClimbingTypes;
  difficulty: number;
  angle?: number; // angle of slope on the wall
  height?: number; // height of the wall
  description: string;
  accessDescription: string;
  //content
  images: string[];
  reviewIds?: ObjectId[]; //this should come from aggregation, not stored here
  betaIds?: ObjectId[]; //this should come from aggregation, not stored here
  //location
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  //meta
  creatorId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum OutdoorRockFeatures {
  SLAB = 'SLAB',
  VERTICAL = 'VERTICAL',
  OVERHANG = 'OVERHANG',
  ROOF = 'ROOF',
  DIHEDRAL = 'DIHEDRAL',
  ARETE = 'ARETE',
  CRACK = 'CRACK',
  FACE = 'FACE',
  OFFWIDTH = 'OFFWIDTH',
  CHIMNEY = 'CHIMNEY',
  CORNER = 'CORNER',
  ROOF_CRACK = 'ROOF_CRACK',
  ROOF_FACE = 'ROOF_FACE',
  ROOF_ARETE = 'ROOF_ARETE',
  ROOF_DIHEDRAL = 'ROOF_DIHEDRAL',
  ROOF_CHIMNEY = 'ROOF_CHIMNEY',
  ROOF_OFFWIDTH = 'ROOF_OFFWIDTH',
  ROOF_CORNER = 'ROOF_CORNER',
  ROOF_SLAB = 'ROOF_SLAB',
  ROOF_VERTICAL = 'ROOF_VERTICAL',
  ROOF_UNKNOWN = 'ROOF_UNKNOWN',
  UNKNOWN = 'UNKNOWN',
}

export enum OutdoorRockTypes {
  GRANITE = 'GRANITE',
  SANDSTONE = 'SANDSTONE',
  LIMESTONE = 'LIMESTONE',
  QUARTZITE = 'QUARTZITE',
  GNEISS = 'GNEISS',
  SCHIST = 'SCHIST',
  BASALT = 'BASALT',
  RHYOLITE = 'RHYOLITE',
  TRACHYTE = 'TRACHYTE',
  DACITE = 'DACITE',
  ANDESITE = 'ANDESITE',
  TUFF = 'TUFF',
  CONGLOMERATE = 'CONGLOMERATE',
  SHIST = 'SHIST',
  UNKNOWN = 'UNKNOWN',
}

export enum OutdoorRockQuality {
  SOLID = 'SOLID',
  LOOSE = 'LOOSE',
  SANDY = 'SANDY',
  CHOSSED = 'CHOSSED',
  UNKNOWN = 'UNKNOWN',
}

export const RouteSchema = new Schema<Route>({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'Climb',
  },
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  accessDescription: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: false,
  },
  reviewIds: {
    type: [Schema.Types.ObjectId],
    ref: 'RouteReview',
    required: false,
  },
  betaIds: {
    type: [Schema.Types.ObjectId],
    ref: 'RouteBeta',
    required: false,
  },
  type: {
    type: String,
    enum: Object.values(ClimbingTypes),
    required: true,
    index: true,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
    index: true,
  },
  state: {
    type: String,
    required: false,
    index: true,
  },
  country: {
    type: String,
    required: true,
    index: true,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
});

RouteSchema.plugin(mongooseAggregatePaginate);

const Routes = mongoose.model('Route', RouteSchema);

export default Routes;
