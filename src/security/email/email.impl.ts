import type { IEmailService } from "./email.interface";

import { emailConfig as eConfig } from "../../services/email";
import { createTransport } from "nodemailer";
import { InternalServerError } from "../../helpers/http.exceptions";

const transport = createTransport(eConfig());

const messageConfig = (email: string, token: string) => {
  return {
    from: eConfig().auth.user,
    to: email,
    subject: "Recover Password",
    html: `
        <h2> Reset Password </h2>
        <p>
          Follow this link to reset the password for your user: <br>
          This token expires in ${process.env["EXP_RECOVER"]} minutes </p>
        <a href="${process.env["URL_RESET_PWD"]}${token}"> Reset Password </a>`,
  };
};

export class EmailService implements IEmailService {
  async sendEmail(email: string, token: string): Promise<void> {
    await transport.sendMail(messageConfig(email, token))
    .catch(() => {
      throw new InternalServerError("Internal failure while sending email!");
    });
  }
}
