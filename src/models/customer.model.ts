import { Mongoose as mongo } from "mongoose";
import { customerSchema } from "./schemas/customer.schema";

const Schema = new mongo.Schema(customerSchema);

export const CustomerModel = mongo.model("Customers", Schema);
