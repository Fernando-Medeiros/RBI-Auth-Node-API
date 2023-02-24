import type { Request } from "express";

import { Bcrypt } from "../../security/bcrypt";
import { Token } from "../../security/token";

import { AuthRequest } from "../requests/auth.request";
import { isTrue_or_400, isTrue_or_404 } from "../../validators/validators";

import { Customer } from "../../entities/customer";
import { CustomerRepository } from "../../repositories/customer.repository";

export class AuthHandler {
  private readonly CRYPT = new Bcrypt();
  private readonly JWT = new Token();
  private readonly REPO = new CustomerRepository();
  private readonly REQ = new AuthRequest();

  async access(req: Request): Promise<accessResponse> {
    const payload = this.REQ.accessRequest(req);

    const emailExists = await this.REPO.findByEmail(payload.email);

    isTrue_or_404(emailExists, "Email not found!");

    const customerExists = await this.REPO.findOne({ email: payload.email });

    isTrue_or_404(customerExists, "Account not found!");

    const customer = new Customer(Object(customerExists));

    const isEqualTo = await this.CRYPT.compareHashPassword(
      payload.password,
      customer.getPassword
    );

    isTrue_or_400(isEqualTo, "Invalid password!");

    return {
      access: await this.JWT.createAccess({ sub: customerExists?.id }),
      refresh: await this.JWT.createRefresh({ sub: customerExists?.id }),
      type: "bearer",
    };
  }

  async refresh(req: Request): Promise<refreshReponse> {
    const token = this.REQ.refreshRequest(req);

    const payload = await this.JWT.decode(token);

    isTrue_or_400(
      payload.scope === "refresh",
      "Use refresh scope tokens only!"
    );

    return {
      refresh: await this.JWT.createRefresh({ sub: payload.sub }),
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
