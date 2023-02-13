import request from "supertest";
import { expect, test, describe } from "vitest";
import { testServer as server } from "../../conftest";
import { CustomerMock } from "../../clients";

const req = request(server);

const mock = new CustomerMock();

describe("Post", () => {
  mock.afterAll();

  test("register new customer", async () => {
    const resp = await req.post("/customers").send(mock.getDataToCreate());

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toBeNull;
  });

  test("try register new customer without email", async () => {
    const payload = mock.getDataToCreate();
    payload.email = "";

    const resp = await req.post("/customers").send(payload);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  test("try to register new customer with email already registered", async () => {
    const resp = await req.post("/customers").send(mock.getDataToCreate());

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
