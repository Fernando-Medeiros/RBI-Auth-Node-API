import mongoose from "mongoose";
import { expect, test, describe } from "vitest";
import { CustomerMock, req } from "../../clients";

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
    const ObjectId = mongoose.Types.ObjectId;
    const data = mock.getDataToCreate();
    data._id = new ObjectId();

    const resp = await req.post("/customers").send(data);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
