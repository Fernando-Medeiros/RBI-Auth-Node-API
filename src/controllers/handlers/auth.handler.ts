import type { BooleanExpression } from "mongoose";
import type { Request } from "express";
import { Token } from "../../security/token";
import { CustomerModel } from "../../models/customers.model";
import { CustomerCreateSchema, PropsCreate } from "../../entities/customer";

interface loginRequest {
  email: string;
  password: string;
}
interface loginResponse {
  access: string;
  refresh: string;
  type: string;
}
interface refreshRequest {
  token: string;
}
interface refreshReponse {
  refresh: string;
  type: string;
}

const throwError = (expression: BooleanExpression, message: string) => {
  if (expression) {
    throw new Error(message);
  }
};

const jwt = new Token();

export class AuthHandler {
  async login(req: Request): Promise<loginResponse> {
    const payload: loginRequest = req.body;

    throwError(
      !payload.email && !payload.password,
      "Missing email and password!"
    );

    const result: PropsCreate | null = await CustomerModel.findOne({
      email: payload.email,
    });

    throwError(result === null, "Email not found!");

    const customer = new CustomerCreateSchema(result);

    throwError(
      (await customer.compareHashPassword(payload.password)) === false,
      "Invalid password!"
    );

    return {
      access: await jwt.createAccess({ sub: customer.getid }),
      refresh: await jwt.createRefresh({ sub: customer.getid }),
      type: "bearer",
    };
  }

  async refresh(req: Request): Promise<refreshReponse> {
    const { token }: refreshRequest = req.body;

    throwError(!token, "Missing refresh token!");

    const payload = await jwt.decode(token);

    throwError(payload.scope != "refresh", "Use refresh scope tokens only!");

    return {
      refresh: await jwt.createRefresh({ sub: payload.sub }),
      type: "bearer",
    };
  }
}
