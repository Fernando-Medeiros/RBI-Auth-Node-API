import { expect, it, describe, beforeAll, afterAll } from 'vitest';
import { app, secretHeader } from 'tests/config/config';
import { CustomerMock } from 'tests/config/customer';
import { Helpers } from 'tests/config/helpers/insert-customer';
import { getAuthorizationHeader } from 'tests/config/helpers/get-token-by-scope';

const mock = new CustomerMock();
const headers = { ...secretHeader, Authorization: '' };

describe('AccessToken - Exceptions', async () => {
    afterAll(async () => await Helpers.removeCustomer(headers));

    beforeAll(async () => {
        await Helpers.insertCustomer(mock.dataToCreate, headers);

        Object.assign(
            headers,
            await getAuthorizationHeader('access', mock.dataToLogin, headers),
        );
    });

    const data1 = Object.assign(mock.dataToLogin, {
        email: 'email@example.com',
    });
    const data2 = Object.assign(mock.dataToLogin, {
        password: '@example.com',
    });

    it('Should return 400 when passing invalid or null data', async () => {
        const [respNull, respEmail, respPwd] = await Promise.all([
            await app.post('/token').set(headers).send(),
            await app.post('/token').set(headers).send(data1),
            await app.post('/token').set(headers).send(data2),
        ]);

        expect(respNull.statusCode).toBe(400);
        expect(respNull.body).toBeTypeOf('object');

        expect(respEmail.statusCode).toBe(404);
        expect(respEmail.body).toBeTypeOf('object');

        expect(respPwd.statusCode).toBe(400);
        expect(respPwd.body).toBeTypeOf('object');
    });
});
