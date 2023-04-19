import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { app, secretHeader } from "tests/config/config";
import { CustomerMock } from "tests/config/customer";
import { Helpers } from "tests/config/helpers/insert-customer";
import { getAuthorizationHeader } from "tests/config/helpers/get-token-by-scope";

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: "" };

describe("RefreshToken - Exceptions", async () => {
  afterAll(async () => await Helpers.removeCustomer(headers));

  beforeAll(async () => {
    await Helpers.insertCustomer(mock.dataToCreate, headers);

    Object.assign(
      headers,
      await getAuthorizationHeader("access", mock.dataToLogin, headers)
    );
  });

  const iToken = `${Math.random() * 2}`;

  it("Should return 401 when passing invalid or null token", async () => {
    const [respNull, respInvalid] = await Promise.all([
      await app.post("/refresh").set(headers).send(),
      await app.post("/refresh").set(headers).send({ token: iToken }),
    ]);

    expect(respNull.statusCode).toBe(401);
    expect(respNull.body).toBeTypeOf("object");

    expect(respInvalid.statusCode).toBe(401);
    expect(respInvalid.body).toBeTypeOf("object");
  });

  it("should return 400 when sending a different scope token", async () => {
    const resp = await app
      .post("/refresh")
      .set(headers)
      .send({
        token: headers.Authorization.replace("bearer ", ""),
      });

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
