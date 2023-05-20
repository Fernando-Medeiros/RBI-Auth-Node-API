import { expect, it, describe, beforeAll } from 'vitest';
import { app, secretHeader } from 'tests/config/config';
import { CustomerMock } from 'tests/config/customer';
import { Helpers } from 'tests/config/helpers/insert-customer';
import { getAuthorizationHeader } from 'tests/config/helpers/get-token-by-scope';

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: '' };

describe('Delete - Success', () => {
    beforeAll(async () => {
        await Helpers.insertCustomer(mock.dataToCreate, headers);

        Object.assign(
            headers,
            await getAuthorizationHeader('access', mock.dataToLogin, headers),
        );
    });

    it('Should delete customer with authenticated session', async () => {
        const resp = await app.delete('/customers').set(headers);

        expect(resp.statusCode).toBe(204);
        expect(resp.body).toBeNull;
    });
});
