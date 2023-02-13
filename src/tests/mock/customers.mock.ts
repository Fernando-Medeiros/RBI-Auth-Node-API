import {
  CustomerCreateSchema,
  CustomerUpdateSchema,
} from "../../schemas/customer.schema";

import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const CustomerCreateMock = new CustomerCreateSchema({
  _id: new ObjectId(),
  firstName: "Tester",
  lastName: "DevSan",
  email: `tester-${Math.random()}@tester.com`,
  password: "tester@123",
  createdAt: new Date(),
});

export const CustomerUpdateMock = new CustomerUpdateSchema({
  firstName: "NewTesterName",
  lastName: "NewLastName",
  email: `newtester-${Math.random()}@tester.com`,
});
