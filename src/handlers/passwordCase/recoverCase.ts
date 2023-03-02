import type { Request } from "express";

import type { IToken } from "../../security/token/token.interface";
import type { IPwdRepository } from "../../repositories/passwordRepo/interface";
import type { IPwdRequests } from "./requests/requests.interface";
import type { IEmailService } from "../../security/email/email.interface";

export async function recoverCase(
  req: Request,
  jwt: IToken,
  pwdRequest: IPwdRequests,
  pwdRepository: IPwdRepository,
  pwdEmail: IEmailService
): Promise<{ message: string }> {
  const { email } = pwdRequest.getRequestToRecover(req);

  const customer = await pwdRepository.findByEmail(email);

  const token = await jwt.createRecover({ sub: customer?.id as string });

  await pwdEmail.sendEmail(email, token);

  return { message: "Email sent, check your inbox!" };
}
