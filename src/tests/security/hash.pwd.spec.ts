import { expect, test, describe } from "vitest";
import { Crypt } from "../../security/crypt/crypt";
import { CustomerMock } from "../clients";

const bcrypt = new Crypt();
const mock = new CustomerMock();

describe("Unit", () => {
  test("hash password", async () => {
    const { password } = mock.getDataToCreate();

    const hashPwd = await bcrypt.hash(password);

    expect(hashPwd.length).toBeGreaterThan(50);

    expect(await bcrypt.compare(password, hashPwd)).toEqual(true);
  });
});
