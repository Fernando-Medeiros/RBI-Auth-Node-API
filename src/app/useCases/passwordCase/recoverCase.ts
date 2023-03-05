import type { Request } from "express";

import type { IToken } from "@app/interfaces/security/token.interface";
import type { IPwdRepository } from "@app/interfaces/repositories/password.repository.interface";
import type { IPwdRequests } from "./requests/requests.interface";
import type { IEmailService } from "@app/interfaces/security/email.interface";

export async function recoverCase(
  req: Request,
  jwt: IToken,
  pwdRequest: IPwdRequests,
  pwdRepository: IPwdRepository,
  pwdEmail: IEmailService
): Promise<{ message: string }> {
  const { email } = pwdRequest.getRequestToRecover(req);

  const customer = await pwdRepository.findByEmail(email);

  const token = await jwt.createRecover({ sub: customer?.pubId as string });

  await pwdEmail.sendEmail(email, token);

  return { message: "Email sent, check your inbox!" };
}
