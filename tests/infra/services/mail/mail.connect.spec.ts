import { describe, test, expect } from 'vitest';
import { config } from 'dotenv';
config();

import { EmailService } from 'infra/security/email/email.impl';

describe('EmailService', () => {
    test('should connect to the email service', async () => {
        const EService = new EmailService();

        const email = 'test@example.com';
        const token = '0000000000000000000000000000';

        const result = await EService.sendEmail(email, token);

        expect(result).toBeTypeOf('string');
    });
});
