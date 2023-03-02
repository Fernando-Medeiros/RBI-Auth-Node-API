import type { Request } from "express";
import type { ICrypt } from "../../security/crypt/crypt.interface";
import type { IPwdRepository } from "../../repositories/passwordRepo/interface";
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

  pwdRepository.findByIdAndUpdate(sub as string, { password: hashPassword });
}
