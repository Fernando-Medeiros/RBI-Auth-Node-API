import { expect, it, describe, beforeAll, afterAll } from 'vitest';
import { app, secretHeader } from 'tests/config/config';
import { CustomerMock } from 'tests/config/customer';
import { Helpers } from 'tests/config/helpers/insert-customer';
import { getAuthorizationHeader } from 'tests/config/helpers/get-token-by-scope';

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: '' };

describe('Patch - Success', () => {
    afterAll(async () => await Helpers.removeCustomer(headers));

    beforeAll(async () => {
        await Helpers.insertCustomer(mock.dataToCreate, headers);

        Object.assign(
            headers,
            await getAuthorizationHeader('access', mock.dataToLogin, headers),
        );
    });

    it('Should update first and last name', async () => {
        const resp = await app.patch(`/customers`).set(headers).send({
            firstName: 'test test',
            lastName: 'example',
        });

        expect(resp.statusCode).toBe(204);
        expect(resp.body).toBeNull;
    });

    it('Should update email', async () => {
        const resp = await app
            .patch(`/customers`)
            .set(headers)
            .send({ email: `example-${Math.random()}@testster.com` });

        expect(resp.statusCode).toBe(204);
        expect(resp.body).toBeNull;
    });
});
