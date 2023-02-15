import { expect, test, describe } from "vitest";
import { CustomerMock } from "../../clients";

const mock = new CustomerMock();

describe("Unit", () => {
  test("hash password", async () => {
    const { password } = mock.getDataToCreate();
    const hashPwd = await mock.getHashPassword();

    expect(hashPwd.length).toBeGreaterThan(50);
    expect(await mock.compareHashPassword(password)).toEqual(true);
  });
});
