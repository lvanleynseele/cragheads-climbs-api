import mongoose, { ObjectId, Schema } from 'mongoose';

export interface Preference {
  profileId: ObjectId;
  ClimbingScale: ClimbingScales;
  BoulderScale: BoulderingScales;
  Units: Units;
}

export enum ClimbingScales {
  French = 'French',
  Yosemite = 'Yosemite',
  Australian = 'Australian',
  UIAA = 'UIAA',
}

export enum BoulderingScales {
  Hueco = 'Hueco',
  // Font = 'Font',
  // VScale = 'V-Scale',
}

export enum Units {
  Metric = 'Metric',
  Imperial = 'Imperial',
}

const preferencesSchema = new Schema<Preference>({
  profileId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  ClimbingScale: {
    type: String,
    enum: Object.values(ClimbingScales),
    required: true,
  },
  BoulderScale: {
    type: String,
    enum: Object.values(BoulderingScales),
    required: true,
  },
  Units: {
    type: String,
    enum: Object.values(Units),
    required: true,
  },
});

const Preferences = mongoose.model<Preference>(
  'Preferences',
  preferencesSchema,
);

Preferences.ensureIndexes();

export default Preferences;
