import { expect, test, describe } from 'vitest';
import { CustomerMock } from 'tests/config/customer';
import { Crypt } from 'infra/security/crypt/crypt.impl';

const bcrypt = new Crypt();
const mock = new CustomerMock();

describe('Unit', () => {
    test('hash password', async () => {
        const { password } = mock.dataToCreate;

        const hashPwd = await bcrypt.hash(password);

        expect(hashPwd.length).toBeGreaterThan(50);

        expect(await bcrypt.compare(password, hashPwd)).toEqual(true);
    });
});
