import { expect, test, describe } from "vitest";
import { CustomerMock, req } from "../../clients";

const mock = new CustomerMock();

describe("Get", () => {
  mock.beforeAll();
  mock.afterAll();

  test("get all customers", async () => {
    const resp = await req.get("/customers");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
  });

  test("get customer by id", async () => {
    const resp = await req.get(`/customers/${mock.getId()}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
  });

  test("try get customer by invalid id", async () => {
    const resp = await req.get(`/customers/${"sad1243SA12"}`);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toBeTypeOf("object");
  });

  // add 401
});
