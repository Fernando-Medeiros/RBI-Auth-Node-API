import { expect, it, describe, beforeAll } from "vitest";
import { app, secretHeader } from "@tes/config/config";

import { CustomerMock } from "@tes/config/customer";
import { Helpers } from "@tes/config/helpers/insert-customer";
import { authHeader } from "@tes/config/headers/authorization.header";
import { getTokenByScope } from "@tes/config/helpers/get-token-by-scope";

const mock = new CustomerMock();

describe("RefreshToken - Ok", async () => {
  beforeAll(async () => await Helpers.insertCustomer(mock.dataToCreate));

  it("Should return an object with the tokens", async () => {
    const resp = await app
      .post("/refresh")
      .set(secretHeader)
      .send({ token: await getTokenByScope("refresh", mock.dataToLogin) });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toHaveProperty("refresh");
    expect(resp.body).toHaveProperty("type", "bearer");
  });
});

describe("RefreshToken - Exceptions", async () => {
  await authHeader(await getTokenByScope("refresh", mock.dataToLogin)).then(
    (authorizationHeader) => {
      Helpers.removeCustomer(authorizationHeader);
    }
  );

  const iToken = `${Math.random() * 2}`;

  it("Should return 401 when passing invalid or null token", async () => {
    const [respNull, respInvalid] = await Promise.all([
      await app.post("/refresh").set(secretHeader).send(),
      await app.post("/refresh").set(secretHeader).send({ token: iToken }),
    ]);

    expect(respNull.statusCode).toBe(401);
    expect(respNull.body).toBeTypeOf("object");

    expect(respInvalid.statusCode).toBe(401);
    expect(respInvalid.body).toBeTypeOf("object");
  });

  it("should return 400 when sending a different scope token", async () => {
    const resp = await app
      .post("/refresh")
      .set(secretHeader)
      .send({ token: await getTokenByScope("access", mock.dataToLogin) });

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
