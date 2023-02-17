import { expect, test, describe } from "vitest";
import { CustomerMock, req } from "../../clients";

const mock = new CustomerMock();

describe("Delete", () => {
  mock.beforeAll();
  let headerAuth: object;

  test("delete customer", async () => {
    headerAuth = await mock.getAuthorization();

    const resp = await req.delete(`/customers/${mock.getId()}`).set(headerAuth);

    expect(resp.statusCode).toBe(204);
    expect(resp.body).toBeNull;
  });

  test("try deleting the same customer twice", async () => {
    await req.delete(`/customers/${mock.getId()}`).set(headerAuth);

    const resp = await req.delete(`/customers/${mock.getId()}`).set(headerAuth);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  test("try delete customer by invalid id", async () => {
    const resp = await req
      .delete(`/customers/${"safaf4as311"}`)
      .set(headerAuth);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  test("Should return unauthorized 401", async () => {
    const resp = await req.delete(`/customers/${mock.getId()}`);

    expect(resp.statusCode).toBe(401);
  });
});
