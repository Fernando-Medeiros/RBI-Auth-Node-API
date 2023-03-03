import type { Request } from "express";

import { Customer } from "@dom/entities/customer";
import type { PropsCreate } from "@dom/interfaces/customer.interface";

import type { ICrypt } from "@app/interfaces/security/crypt.interface";
import type { IToken } from "@app/interfaces/security/token.interface";
import type { IAuthRequests } from "./requests/requests.interface";
import type { IAuthRepository } from "@src/app/interfaces/repositories/auth.repository.interface";

import { isTrue_or_400, isTrue_or_404 } from "@app/validators/validators";

export async function accessCase(
  req: Request,
  crypt: ICrypt,
  jwt: IToken,
  repository: IAuthRepository,
  authRequest: IAuthRequests
): Promise<accessResponse> {
  const { email, password } = authRequest.getRequestToAccess(req);

  const emailExists = await repository.findByEmail(email);

  isTrue_or_404(emailExists, "Email not found!");

  const customerExists = await repository.findOne({
    email: email,
  });

  const customer = new Customer(customerExists as PropsCreate);

  const isEqualTo = await crypt.compare(password, customer.getPassword);

  isTrue_or_400(isEqualTo, "Invalid password!");

  return {
    access: await jwt.createAccess({ sub: customerExists?.id as string }),
    refresh: await jwt.createRefresh({ sub: customerExists?.id as string }),
    type: "bearer",
  };
}

interface accessResponse {
  access: string;
  refresh: string;
  type: string;
}
