import { expect, it, describe } from "vitest";
import { app, secretHeader } from "tests/config/config";
import { Token } from "infra/security/token/token.impl";

const jwt = new Token();
const pubId = { id: "" };

describe("Reset - Password - Exceptions", async () => {
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
