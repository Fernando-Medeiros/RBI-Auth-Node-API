import { Schema, model } from "mongoose";

const equipmentsSchema = {
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  head: {
    type: Object,
  },
  body: {
    type: Object,
  },
  leg: {
    type: Object,
  },
  handLeft: {
    type: Object,
  },
  handRight: {
    type: Object,
  },
  accessoryLeft: {
    type: Object,
  },
  accessoryRight: {
    type: Object,
  },
};

const schema = new Schema(equipmentsSchema);

export const EquipmentsModel = model("Equipments", schema);
