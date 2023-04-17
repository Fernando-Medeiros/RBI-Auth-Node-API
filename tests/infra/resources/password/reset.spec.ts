import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { app, secretHeader } from "@tes/config/config";

import { Token } from "@inf/security/token/token.impl";
import { CustomerMock } from "@tes/config/customer";
import { Helpers } from "@tes/config/helpers/insert-customer";
import { authHeader } from "@tes/config/headers/authorization.header";
import { getOneCustomer } from "@tes/config/helpers/get-one-customer";
import { getTokenByScope } from "@tes/config/helpers/get-token-by-scope";

const jwt = new Token();
const mock = new CustomerMock();
const headerAuth = { Authorization: "" };
const pubId = { id: "" };

describe("Reset - Password - Ok", () => {
  beforeAll(async () => await Helpers.insertCustomer(mock.dataToCreate));

  it("Get Header and pubId", async () => {
    await authHeader(await getTokenByScope("access", mock.dataToLogin)).then(
      (authorizationHeader) => {
        Object.assign(headerAuth, authorizationHeader);
      }
    );
    await getOneCustomer(headerAuth).then((id) => {
      Object.assign(pubId, { id: id });
    });
  });

  it("Should return 204 when sending recover scope token and a new valid password", async () => {
    const newPwd = "Test@1234";
    const RToken = await jwt.createRecover({ sub: pubId.id });

    const resp = await app
      .patch(`/password/${RToken}`)
      .set(secretHeader)
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(204);
    expect(resp.body).toBeNull;
  });
});

describe("Reset - Password - Exceptions", async () => {
  afterAll(async () => await Helpers.removeCustomer(headerAuth));

  it("Should return 401 when sending an invalid or null token", async () => {
    const newPwd = "newTest@8899";

    const resp = await app
      .patch(`/password/${Math.random() * 2}`)
      .set(secretHeader)
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(401);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 400 when sending a scope token other than recover", async () => {
    const newPwd = "NNttPWd@@##00";
    const AToken = await jwt.createAccess({ sub: pubId.id });

    const resp = await app
      .patch(`/password/${AToken}`)
      .set(secretHeader)
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 400 when sending password in invalid format", async () => {
    const newPwd = "<======>";
    const RToken = await jwt.createRecover({ sub: pubId.id });

    const resp = await app
      .patch(`/password/${RToken}`)
      .set(secretHeader)
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
