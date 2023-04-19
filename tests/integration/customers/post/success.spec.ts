import { expect, it, describe } from "vitest";
import { app, secretHeader } from "tests/config/config";
import { CustomerMock } from "tests/config/customer";

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: "" };

describe("Post - Success", async () => {
  it("Should register a new customer", async () => {
    const resp = await app
      .post("/customers")
      .set(headers)
      .send(mock.dataToCreate);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toBeNull;
  });
});
