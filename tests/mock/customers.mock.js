import { CustomerCreateSchema } from "../../src/models/schemas/customer.schema";

export const CustomerMock = new CustomerCreateSchema({
  firstName: "Tester",
  lastName: "DevSan",
  email: "tester@tester.com",
  password: "tester@123",
  createdAt: new Date(),
});
