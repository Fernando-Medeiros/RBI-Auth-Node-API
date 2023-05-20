import { expect, it, describe, beforeAll, afterAll } from 'vitest';
import { app, secretHeader } from 'tests/config/config';
import { CustomerMock } from 'tests/config/customer';
import { Helpers } from 'tests/config/helpers/insert-customer';
import { getAuthorizationHeader } from 'tests/config/helpers/get-token-by-scope';

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: '' };

describe('Patch - Exceptions', async () => {
    afterAll(async () => await Helpers.removeCustomer(headers));

    beforeAll(async () => {
        await Helpers.insertCustomer(mock.dataToCreate, headers);

        Object.assign(
            headers,
            await getAuthorizationHeader('access', mock.dataToLogin, headers),
        );
    });

    it('Should return 400 when sending request without content', async () => {
        const resp = await app.patch(`/customers`).set(headers).send({});

        expect(resp.statusCode).toBe(400);
        expect(resp.body).toBeTypeOf('object');
    });

    it('Should return 400 when passing non-existent data to update', async () => {
        const resp = await app
            .patch(`/customers`)
            .set(headers)
            .send({ password: 'password@123' });

        expect(resp.statusCode).toBe(400);
        expect(resp.body).toBeTypeOf('object');
    });

    it('Should return unauthorized 401', async () => {
        const resp = await app.patch(`/customers`).set(secretHeader).send({});

        expect(resp.statusCode).toBe(401);
        expect(resp.body).toBeTypeOf('object');
    });
});
