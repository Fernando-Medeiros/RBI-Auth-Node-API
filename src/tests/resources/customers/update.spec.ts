import request from "supertest";
import { expect, test, describe } from "vitest";
import { CustomerMock } from "../../clients";
import { testServer as server } from "../../conftest";

const req = request(server);

const mock = new CustomerMock();

describe("Patch", () => {
  mock.beforeAll();
  mock.afterAll();

  test("update first and last name", async () => {
    const payload = mock.getDataToUpdate();

    payload.email = "";

    const resp = await req.patch(`/customers/${mock.getId()}`).send(payload);

    expect(resp.statusCode).toBe(204);
    expect(resp.body).toBeNull;
  });

  test("update email", async () => {
    const payload = mock.getDataToUpdate();

    payload.firstName = "";
    payload.lastName = "";

    const resp = await req.patch(`/customers/${mock.getId()}`).send(payload);

    expect(resp.statusCode).toBe(204);
    expect(resp.body).toBeNull;
  });

  test("try update without content", async () => {
    const payload = mock.getDataToUpdate();

    payload.firstName = "";
    payload.lastName = "";
    payload.email = "";

    const resp = await req.patch(`/customers/${mock.getId()}`).send(payload);

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });

  // add 401
});
