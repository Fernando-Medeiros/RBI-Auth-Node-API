import {
  CustomerCreateSchema,
  CustomerUpdateSchema,
} from "../../models/schemas/customer.schema";

export const CustomerCreateMock = new CustomerCreateSchema({
  firstName: "Tester",
  lastName: "DevSan",
  email: "tester@tester.com",
  password: "tester@123",
});

export const CustomerUpdateMock = new CustomerUpdateSchema({
  firstName: "NewTesterName",
  lastName: "NewLastName",
  email: "tester@tester.com",
});
