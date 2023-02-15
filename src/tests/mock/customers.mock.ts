import {
  CustomerCreateSchema,
  CustomerUpdateSchema,
} from "../../schemas/customer.schema";

export const CustomerCreateMock = new CustomerCreateSchema({
  firstName: "Tester",
  lastName: "DevSan",
  email: `tester-${Math.random()}@tester.com`,
  password: "tester@123",
});

export const CustomerUpdateMock = new CustomerUpdateSchema({
  firstName: "NewTesterName",
  lastName: "NewLastName",
  email: `newtester-${Math.random()}@tester.com`,
});
