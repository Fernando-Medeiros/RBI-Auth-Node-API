import { expect, test, describe } from "vitest";
import { CustomerMock, req } from "../../clients";

const mock = new CustomerMock();

describe("Get", () => {
  mock.beforeAll();
  mock.afterAll();
  let headerAuth: object;

  test("get all customers", async () => {
    headerAuth = await mock.getAuthorization();

    const resp = await req.get("/customers").set(headerAuth);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
    expect(resp.body.length).toBeGreaterThan(0);
  });

  test("get customer by id", async () => {
    const resp = await req.get(`/customers/${mock.getId()}`).set(headerAuth);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
  });

  test("try get customer by invalid id", async () => {
    const resp = await req.get(`/customers/${"sad1243SA12"}`).set(headerAuth);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toBeTypeOf("object");
  });

  test("Should return unauthorized 401", async () => {
    const respAll = await req.get("/customers");
    const respById = await req.get(`/customers/${mock.getId()}`);

    expect(respAll.statusCode).toBe(401);
    expect(respById.statusCode).toBe(401);
  });
});
