import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { app, secretHeader } from "@tes/config/config";

import { CustomerMock } from "@tes/config/customer";
import { Helpers } from "@tes/config/helpers/insert-customer";
import { authHeader } from "@tes/config/headers/authorization.header";
import { getTokenByScope } from "@tes/config/helpers/get-token-by-scope";

const mock = new CustomerMock();

describe("AccessToken - Ok", async () => {
  beforeAll(async () => await Helpers.insertCustomer(mock.dataToCreate));

  it("Should return an object with the tokens", async () => {
    const resp = await app
      .post("/token")
      .set(secretHeader)
      .send(mock.dataToLogin);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toHaveProperty("access");
    expect(resp.body).toHaveProperty("refresh");
    expect(resp.body).toHaveProperty("type", "bearer");
  });
});

describe("AccessToken - Exceptions", async () => {
  afterAll(async () => {
    await authHeader(await getTokenByScope("access", mock.dataToLogin)).then(
      (authorizationHeader) => {
        Helpers.removeCustomer(authorizationHeader);
      }
    );
  });
  const data1 = Object.assign(mock.dataToLogin, {
    email: "email@example.com",
  });
  const data2 = Object.assign(mock.dataToLogin, {
    password: "@example.com",
  });

  it("Should return 400 when passing invalid or null data", async () => {
    const [respNull, respEmail, respPwd] = await Promise.all([
      await app.post("/token").set(secretHeader).send(),
      await app.post("/token").set(secretHeader).send(data1),
      await app.post("/token").set(secretHeader).send(data2),
    ]);

    expect(respNull.statusCode).toBe(400);
    expect(respNull.body).toBeTypeOf("object");

    expect(respEmail.statusCode).toBe(404);
    expect(respEmail.body).toBeTypeOf("object");

    expect(respPwd.statusCode).toBe(400);
    expect(respPwd.body).toBeTypeOf("object");
  });
});
