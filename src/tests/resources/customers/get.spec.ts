import { expect, it, describe } from "vitest";
import { CustomerMock, req } from "../../clients";

const mock = new CustomerMock();

describe("Get - Ok", async () => {
  mock.beforeAll();
  mock.afterAll();

  let headerAuth: { Authorization: string };
  let id: string;

  it("Should return current session header", async () => {
    headerAuth = await mock.getAuthorization();
    id = await mock.getOneCustomerId(headerAuth);

    expect(headerAuth).toHaveProperty("Authorization");
    expect(id).toBeTypeOf("string");
  });

  it("Should return all customers", async () => {
    const resp = await req.get("/customers").set(headerAuth);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
    expect(resp.body.length).toBeGreaterThan(0);
  });

  it("Should return a customer by id", async () => {
    const resp = await req.get(`/customers/${id}`).set(headerAuth);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTypeOf("object");
  });
});

describe("Get - Exceptions", async () => {
  mock.beforeAll();
  mock.afterAll();

  let headerAuth: { Authorization: string };

  it("Should return current session header", async () => {
    headerAuth = await mock.getAuthorization();

    expect(headerAuth).toHaveProperty("Authorization");
  });

  it("Should return 400 when searching for a customer with an invalid id", async () => {
    const resp = await req
      .get(`/customers/sad1243SA12sad1243SA1222`)
      .set(headerAuth);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 404 when looking up a customer with a valid but non-existent hex string", async () => {
    const resp = await req
      .get(`/customers/63f80f49ab18b61e74a92c28`)
      .set(headerAuth);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return unauthorized 401", async () => {
    const respById = await req.get(`/customers/sad1243SA12sad1243SA1222`);

    expect(respById.statusCode).toBe(401);
  });
});
