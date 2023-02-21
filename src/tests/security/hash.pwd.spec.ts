import { expect, test, describe } from "vitest";
import { Bcrypt } from "../../security/bcrypt";
import { CustomerMock } from "../clients";

const bcrypt = new Bcrypt();
const mock = new CustomerMock();

describe("Unit", () => {
  test("hash password", async () => {
    const { password } = mock.getDataToCreate();

    const hashPwd = await bcrypt.hashPassword(password);

    expect(hashPwd.length).toBeGreaterThan(50);

    expect(await bcrypt.compareHashPassword(password, hashPwd)).toEqual(true);
  });
});
