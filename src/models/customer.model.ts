import { Schema, model } from "mongoose";
import { customerSchema } from "./schemas/customer.schema";

const schema = new Schema(customerSchema);

export const CustomerModel = model("Customers", schema);
