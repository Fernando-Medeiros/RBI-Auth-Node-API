import { Schema, model } from "mongoose";

const customerSchema = {
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 11,
    maxlength: 60,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 200,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
};

const schema = new Schema(customerSchema);

export const CustomerModel = model("Customers", schema);
