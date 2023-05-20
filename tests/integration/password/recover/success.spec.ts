import { expect, it, describe, beforeAll, afterAll } from 'vitest';
import { app, secretHeader } from 'tests/config/config';
import { CustomerMock } from 'tests/config/customer';
import { Helpers } from 'tests/config/helpers/insert-customer';

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: '' };

describe('Recover - Password - Success', async () => {
    beforeAll(async () => {
        await Helpers.insertCustomer(mock.dataToCreate, headers);
    });
    afterAll(async () => await Helpers.removeCustomer(headers));

    it('Should send the registered email and return statusSuccess', async () => {
        const resp = await app
            .post('/password')
            .set(headers)
            .send({ email: mock.dataToLogin.email });

        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toBeTypeOf('object');
    });
});
