import { expect, it, describe } from "vitest";
import { CustomerMock, req } from "../../clients";

const mock = new CustomerMock();

describe("Password", () => {
  mock.beforeAll();
  mock.afterAll();

  it("should sent email", async () => {
    const resp = await req.post("/password").send(mock.getDataToLogin());

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toBeTypeOf("object");
  });
});
