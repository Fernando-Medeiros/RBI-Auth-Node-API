import { expect, it, describe, beforeAll, afterAll } from "vitest";
import { app, secretHeader } from "tests/config/config";
import { CustomerMock } from "tests/config/customer";
import { Helpers } from "tests/config/helpers/insert-customer";
import { getAuthorizationHeader } from "tests/config/helpers/get-token-by-scope";

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: "" };

describe("Update - Password - Success", async () => {
  afterAll(async () => await Helpers.removeCustomer(headers));

  beforeAll(async () => {
    await Helpers.insertCustomer(mock.dataToCreate, headers);

    Object.assign(
      headers,
      await getAuthorizationHeader("refresh", mock.dataToLogin, headers)
    );
  });

  it("Should return 204 when updating new password", async () => {
    const newPwd = "NewTest@1234";

    const resp = await app
      .patch(`/password`)
      .set(headers)
      .send({ password: newPwd });

    expect(resp.statusCode).toEqual(204);
    expect(resp.body).toBeNull;
  });
});
