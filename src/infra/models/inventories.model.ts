import { Schema, model } from "mongoose";

const inventoriesSchema = {
  gold: {
    type: Number,
    min: 1,
    default: 1,
  },
  jewel: {
    type: Number,
    min: 1,
    default: 1,
  },
};

const schema = new Schema(inventoriesSchema);

export const InventoriesModel = model("Inventories", schema);
