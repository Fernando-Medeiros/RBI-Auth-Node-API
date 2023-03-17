import { expect, it, describe } from "vitest";

import { app } from "@tes/config/config";

import { CustomerMock } from "@tes/config/clients";

import { Token } from "@inf/security/token/token.impl";

const jwt = new Token();
const mock = new CustomerMock();

let headerAuth: { Authorization: string };
let id: string;

describe("Get Header -> Authorization", () => {
  mock.beforeAll();

  it("Should return current session header", async () => {
    headerAuth = await mock.getAuthorization();
    id = await mock.getOneCustomerId(headerAuth);

    expect(headerAuth).toHaveProperty("Authorization");
    expect(id).toBeTypeOf("string");
  });
});

describe("Reset - Password - Ok", () => {
  it("Should return 204 when sending recover scope token and a new valid password", async () => {
    const newPwd = "NewTest@1234";
    const RToken = await jwt.createRecover({ sub: id });

    const resp = await app
      .patch(`/password/${RToken}`)
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(204);
    expect(resp.body).toBeNull;
  });
});

describe("Reset - Password - Exceptions", () => {
  mock.afterAll();

  it("Should return 401 when sending an invalid or null token", async () => {
    const newPwd = "newTest@8899";

    const resp = await app
      .patch(`/password/${Math.random() * 2}`)
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(401);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 400 when sending a scope token other than recover", async () => {
    const newPwd = "NNttPWd@@##00";
    const AToken = await jwt.createAccess({ sub: id });

    const resp = await app
      .patch(`/password/${AToken}`)
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toBeTypeOf("object");
  });

  it("Should return 400 when sending password in invalid format", async () => {
    const newPwd = "<======>";
    const RToken = await jwt.createRecover({ sub: id });

    const resp = await app
      .patch(`/password/${RToken}`)
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toBeTypeOf("object");
  });
});
