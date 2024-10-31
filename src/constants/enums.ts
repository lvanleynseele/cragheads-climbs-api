export enum ClimbingAreaTags {}

export enum ClimbingAreaFacilities {
  'Bathrooms',
  'Camping',
  'Drinking Water',
  'Parking',
  'Pets Allowed',
  'Showers',
  'Store',
  'Wi-Fi',
  'Other',
}

export enum ClimbingTypes {
  Aid = 'Aid',
  Bouldering = 'Bouldering',
  DeepWaterSolo = 'Deep Water Solo',
  FreeSolo = 'Free Solo',
  Gym = 'Gym',
  Ice = 'Ice',
  Sport = 'Sport',
  Trad = 'Trad',
  TopRope = 'Top Rope',
}

export enum KeyMoveTypes {
  DYNO = 'Dyno',
  HEEL_HOOK = 'Heel Hook',
  TOE_HOOK = 'Toe Hook',
  KNEE_BAR = 'Knee Bar',
  MANTLE = 'Mantle',
  LAYBACK = 'Layback',
  JAM = 'Jam',
  CRIMP = 'Crimp',
  PINCH = 'Pinch',
  SLOPER = 'Sloper',
  GASTON = 'Gaston',
  UNDERCLING = 'Undercling',
  SIDE_PULL = 'Side Pull',
  PALM = 'Palm',
  OTHER = 'Other',
}

export enum HoldTypes {
  JUG = 'Jug',
  CRIMP = 'Crimp',
  SLOPER = 'Sloper',
  PINCH = 'Pinch',
  POCKET = 'Pocket',
  EDGE = 'Edge',
  VOLUME = 'Volume',
  FEATURE = 'Feature',
  OTHER = 'Other',
}

export enum HangBoardTypes {
  MAX_WEIGHT = 'MAX_WEIGHT',
  ENDURANCE = 'ENDURANCE',
}

export enum HangBoardGripTypes {
  '4FINGER' = '4FINGER',
  '3FINGER' = '3FINGER',
  '2FINGER' = '2FINGER',
  MONO = 'MONO',
  'FULL_CRIMP' = 'FULL_CRIMP',
  'HALF_CRIMP' = 'HALF_CRIMP',
  'OPEN_HAND' = 'OPEN_HAND',
  POCKET = 'POCKET',
}

export enum HangBoardHoldTypes {
  JUG = 'JUG',
  CRIMP = 'CRIMP',
  PINCH = 'PINCH',
  SLOPER = 'SLOPER',
}

export enum HangBoardHoldSizes {
  '6mm' = '6mm',
  '8mm' = '8mm',
  '10mm' = '10mm',
  '12mm' = '12mm',
  '14mm' = '14mm',
  '18mm' = '18mm',
  '20mm' = '20mm',
  '40mm' = '40mm',
}

export enum CampusBoardTypes {
  MAX_REACH = 'MAX_REACH',
  POWER = 'POWER',
}

export enum CampusBoardGripTypes {
  OPEN_HAND = 'OPEN_HAND',
  HALF_CRIMP = 'HALF_CRIMP',
  FULL_CRIMP = 'FULL_CRIMP',
}

export enum CardioExerciseTypes {
  RUNNING = 'RUNNING',
  CYCLING = 'CYCLING',
  SWIMMING = 'SWIMMING',
  ROWING = 'ROWING',
  ELLIPTICAL = 'ELLIPTICAL',
  JUMP_ROPE = 'JUMP_ROPE',
  HIKING = 'HIKING',
  WALKING = 'WALKING',
  STAIR_CLIMBING = 'STAIR_CLIMBING',
}

export enum ArmExerciseTypes {
  BICEP_CURL = 'BICEP_CURL',
  TRICEP_EXTENSION = 'TRICEP_EXTENSION',
  HAMMER_CURL = 'HAMMER_CURL',
  SKULL_CRUSHER = 'SKULL_CRUSHER',
  DUMBBELL_PRESS = 'DUMBBELL_PRESS',
  PULL_UP = 'PULL_UP',
  CHIN_UP = 'CHIN_UP',
  CONCENTRATION_CURL = 'CONCENTRATION_CURL',
  PREACHER_CURL = 'PREACHER_CURL',
  TRICEP_DIP = 'TRICEP_DIP',
  OVERHEAD_TRICEP_EXTENSION = 'OVERHEAD_TRICEP_EXTENSION',
  CABLE_TRICEP_PUSH_DOWN = 'CABLE_TRICEP_PUSH_DOWN',
  REVERSE_GRIP_BICEP_CURL = 'REVERSE_GRIP_BICEP_CURL',
  INCLINE_DUMBBELL_CURL = 'INCLINE_DUMBBELL_CURL',
  CLOSE_GRIP_BENCH_PRESS = 'CLOSE_GRIP_BENCH_PRESS',
  BENCH_PRESS = 'BENCH_PRESS',
  ZOTTMAN_CURL = 'ZOTTMAN_CURL',
}

export enum LegExerciseTypes {
  SQUAT = 'SQUAT',
  LUNGE = 'LUNGE',
  LEG_PRESS = 'LEG_PRESS',
  DEADLIFT = 'DEADLIFT',
  LEG_CURL = 'LEG_CURL',
  LEG_EXTENSION = 'LEG_EXTENSION',
  CALF_RAISE = 'CALF_RAISE',
  BULGARIAN_SPLIT_SQUAT = 'BULGARIAN_SPLIT_SQUAT',
  STEP_UP = 'STEP_UP',
  GLUTE_BRIDGE = 'GLUTE_BRIDGE',
  HIP_THRUST = 'HIP_THRUST',
}

export enum Regions {
  'Africa',
  'Asia',
  'Australia',
  'Europe',
  'North America',
  'South America',
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

export enum AreaInteractionTypes {
  CLIMB = 'Climb',
  REVIEW = 'Review',
  POST = 'Post',
  PHOTO = 'Photo',
  Video = 'Video',
  ADDED = 'Added',
  ACTIVATED = 'Activated',
  DEACTIVATED = 'Deactivated',
  UPDATED = 'Updated',
  VALIDATED = 'Validated',
  ROUTE_ADDED = 'RouteAdded',
  VIEWED = 'Viewed',
}

export enum RouteInteractionTypes {
  CLIMB = 'Climb',
  POST = 'Post',
  PHOTO = 'Photo',
  VIDEO = 'Video',
  BETA = 'Beta',
  BETA_VOTE = 'BetaVote',
  REVIEW = 'Review',
  ADDED = 'Added',
  ACTIVATED = 'Activated',
  DEACTIVATED = 'Deactivated',
  UPDATED = 'Updated',
  VERIFIED = 'Verified',
}
