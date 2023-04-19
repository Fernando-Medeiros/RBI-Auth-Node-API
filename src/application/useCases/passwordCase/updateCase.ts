import type { Request } from "express";

import type { ICrypt } from "app/interfaces/security/crypt.interface";
import type { IPwdRepository } from "app/interfaces/repositories/password.repository.interface";
import type { IPwdRequests } from "./requests/requests.interface";

export async function updateCase(
  req: Request,
  crypt: ICrypt,
  pwdRequest: IPwdRequests,
  pwdRepository: IPwdRepository
): Promise<void> {
  const { sub } = req.headers;

  const { password } = pwdRequest.getRequestToUpdate(req);

  const hashPassword = await crypt.hash(password);

  await pwdRepository.findByIdAndUpdate(sub as string, {
    password: hashPassword,
  });
}
