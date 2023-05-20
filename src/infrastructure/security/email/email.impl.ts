import type { IEmailService } from 'app/interfaces/security/email.interface';
import { createTransport } from 'nodemailer';
import { emailConfig as eConfig } from 'infra/services/email/email';
import { InternalServerError } from 'utils/http.exceptions';

const messageConfig = (email: string, token: string) => {
    return {
        from: eConfig().auth.user,
        to: email,
        subject: 'Recover Password',
        html: `
        <h2> Reset Password </h2>
        <p>
          Follow this link to reset the password for your user: <br>
          This token expires in ${process.env['EXP_RECOVER']} minutes </p>
        <a href="${process.env['URL_RESET_PWD']}${token}"> Reset Password </a>`,
    };
};

export class EmailService implements IEmailService {
    transport = createTransport(eConfig());

    async sendEmail(email: string, token: string): Promise<string | void> {
        return await this.transport
            .sendMail(messageConfig(email, token))
            .then(() => 'Email sent successfully')
            .catch(() => {
                throw new InternalServerError(
                    'Internal failure while sending email!',
                );
            });
    }
}
