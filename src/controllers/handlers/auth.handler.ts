import type { Request } from "express";
import type { PropsCreate } from "../../entities/interfaces/customer.interface";

import { Bcrypt } from "../../security/bcrypt";
import { Token } from "../../security/token";

import { AuthRequest } from "../requests/auth.request";
import { isTrue_or_400, isTrue_or_404 } from "../../validators/validators";

import { Customer } from "../../entities/customer";
import { CustomerRepository } from "../../repositories/customer.repository";

export class AuthHandler {
  private readonly crypt = new Bcrypt();
  private readonly jwt = new Token();
  private readonly repository = new CustomerRepository();
  private readonly authRequest = new AuthRequest();

  async access(req: Request): Promise<accessResponse> {
    const payload = this.authRequest.accessRequest(req);

    const emailExists = await this.repository.findByEmail(payload.email);

    isTrue_or_404(emailExists, "Email not found!");

    const customerExists = await this.repository.findOne({ email: payload.email });

    const customer = new Customer(customerExists as PropsCreate);

    const isEqualTo = await this.crypt.compare(
      payload.password,
      customer.getPassword
    );

    isTrue_or_400(isEqualTo, "Invalid password!");

    return {
      access: await this.jwt.createAccess({ sub: customerExists?.id }),
      refresh: await this.jwt.createRefresh({ sub: customerExists?.id }),
      type: "bearer",
    };
  }

  async refresh(req: Request): Promise<refreshReponse> {
    const token = this.authRequest.refreshRequest(req);

    const payload = await this.jwt.decode(token);

    isTrue_or_400(
      payload.scope === "refresh",
      "Use refresh scope tokens only!"
    );

    return {
      refresh: await this.jwt.createRefresh({ sub: payload.sub }),
      type: "bearer",
    };
  }
}

interface accessResponse {
  access: string;
  refresh: string;
  type: string;
}
interface refreshReponse {
  refresh: string;
  type: string;
}
