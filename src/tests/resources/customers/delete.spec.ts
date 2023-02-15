import { expect, test, describe } from "vitest";
import { CustomerMock, req } from "../../clients";

const mock = new CustomerMock();

describe("Delete", () => {
  mock.beforeAll();
  mock.afterAll();

  test("delete customer", async () => {
    const resp = await req.delete(`/customers/${mock.getId()}`);

    expect(resp.statusCode).toBe(204);
    expect(resp.body).toBeNull;
  });

  test("try deleting the same customer twice", async () => {
    await req.delete(`/customers/${mock.getId()}`);

    const resp = await req.delete(`/customers/${mock.getId()}`);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  test("try delete customer by invalid id", async () => {
    const resp = await req.delete(`/customers/${"safaf4as311"}`);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  // add 401
});
