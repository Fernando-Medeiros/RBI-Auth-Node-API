import type { Request } from "express";

import type { PropsCreate } from "../../entities/interfaces/customer.interface";
import type { ICrypt } from "../../security/crypt/crypt.interface";
import type { IToken } from "../../security/token/token.interface";
import type { ICustomerRepository } from "../../repositories/customer/repository.interface";
import type { IAuthRequests } from "../requests/auth/requests.interface";

import { Customer } from "../../entities/customer";

import { isTrue_or_400, isTrue_or_404 } from "../validators/validators";

export async function accessCase(
  req: Request,
  crypt: ICrypt,
  jwt: IToken,
  repository: ICustomerRepository,
  authRequest: IAuthRequests
): Promise<accessResponse> {
  const payload = authRequest.getAccessRequest(req);

  const emailExists = await repository.findByEmail(payload.email);

  isTrue_or_404(emailExists, "Email not found!");

  const customerExists = await repository.findOne({
    email: payload.email,
  });

  const customer = new Customer(customerExists as PropsCreate);

  const isEqualTo = await crypt.compare(payload.password, customer.getPassword);

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
